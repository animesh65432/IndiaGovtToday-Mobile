import { lanContext } from "@/context/lan";
import { Call } from "@/service/call";
import { Audio } from 'expo-av';
import { Sound } from 'expo-av/build/Audio';
import { useContext, useRef, useState } from "react";

export const usetexttospech = () => {
    const [IsLoading, setIsLoading] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isPaused, setIsPaused] = useState(false)

    const context = useContext(lanContext)
    const soundRef = useRef<Sound | null>(null)
    const chunksRef = useRef<string[]>([])
    const currentChunkIndexRef = useRef(0)

    const splitTextIntoChunks = (text: string, maxLength: number = 2500): string[] => {
        const chunks: string[] = []
        const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]
        let currentChunk = ""

        for (const sentence of sentences) {
            const trimmedSentence = sentence.trim()

            if (trimmedSentence.length > maxLength) {
                if (currentChunk) {
                    chunks.push(currentChunk.trim())
                    currentChunk = ""
                }

                const words = trimmedSentence.split(' ')
                let wordChunk = ""

                for (const word of words) {
                    if ((wordChunk + ' ' + word).length > maxLength) {
                        if (wordChunk) chunks.push(wordChunk.trim())
                        wordChunk = word
                    } else {
                        wordChunk += (wordChunk ? ' ' : '') + word
                    }
                }

                if (wordChunk) chunks.push(wordChunk.trim())
                continue
            }

            if ((currentChunk + ' ' + trimmedSentence).length > maxLength) {
                if (currentChunk) chunks.push(currentChunk.trim())
                currentChunk = trimmedSentence
            } else {
                currentChunk += (currentChunk ? ' ' : '') + trimmedSentence
            }
        }

        if (currentChunk) {
            chunks.push(currentChunk.trim())
        }

        return chunks
    }

    const cleanup = async () => {
        if (soundRef.current) {
            try {
                await soundRef.current.unloadAsync()
            } catch (e) {
                console.log('Cleanup error:', e)
            }
            soundRef.current = null
        }
        chunksRef.current = []
        currentChunkIndexRef.current = 0
    }

    const playChunk = async (chunkIndex: number): Promise<void> => {
        console.log('Playing chunk:', chunkIndex, '/', chunksRef.current.length)

        if (chunkIndex >= chunksRef.current.length) {
            console.log('All chunks finished')
            await cleanup()
            setIsLoading(false)
            setIsPlaying(false)
            setIsPaused(false)
            return
        }

        const chunk = chunksRef.current[chunkIndex]
        const cleanedChunk = chunk.replace(/[.,/*]/g, "")

        try {
            if (!context) {
                console.error('Context is not available')
                setIsLoading(false)
                setIsPlaying(false)
                setIsPaused(false)
                return
            }

            const { lan } = context

            console.log('Fetching audio for chunk:', chunkIndex)
            const response = await Call({
                method: "POST",
                path: "/texttospech",
                request: {
                    text: cleanedChunk,
                    target_language: lan
                }
            }) as { audioContent: string }

            console.log('Audio received, creating sound object')

            // Unload previous sound
            if (soundRef.current) {
                await soundRef.current.unloadAsync()
                soundRef.current = null
            }

            // Create sound
            const { sound } = await Audio.Sound.createAsync(
                { uri: `data:audio/mp3;base64,${response.audioContent}` },
                { shouldPlay: false }
            )

            soundRef.current = sound

            console.log('Sound created, updating states')

            // **UPDATE STATES INDIVIDUALLY AND IN ORDER**
            setIsLoading(false)
            setIsPaused(false)
            setIsPlaying(true)

            console.log('States updated, starting playback')
            await sound.playAsync()

            // Set up finish listener
            sound.setOnPlaybackStatusUpdate((status) => {
                if (status.isLoaded && status.didJustFinish) {
                    console.log('Chunk finished')
                    currentChunkIndexRef.current++
                    playChunk(currentChunkIndexRef.current)
                }
            })

        } catch (error) {
            console.error('Error in playChunk:', error)
            await cleanup()
            setIsLoading(false)
            setIsPlaying(false)
            setIsPaused(false)
        }
    }

    const call = async (text: string) => {
        console.log('Call function started')

        // **SET LOADING STATE FIRST**
        setIsPlaying(false)
        setIsPaused(false)
        setIsLoading(true)

        try {
            await Audio.requestPermissionsAsync()
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                playsInSilentModeIOS: true,
                staysActiveInBackground: true,
            })

            const chunks = splitTextIntoChunks(text, 2500)
            console.log('Split into chunks:', chunks.length)

            chunksRef.current = chunks
            currentChunkIndexRef.current = 0

            await playChunk(0)

        } catch (error) {
            console.error('Error in call:', error)
            setIsLoading(false)
            setIsPlaying(false)
            setIsPaused(false)
        }
    }

    const pause = async () => {
        console.log('Pause called')
        if (soundRef.current && isPlaying) {
            await soundRef.current.pauseAsync()
            setIsPlaying(false)
            setIsPaused(true)
        }
    }

    const resume = async () => {
        console.log('Resume called')
        if (soundRef.current && isPaused) {
            await soundRef.current.playAsync()
            setIsPaused(false)
            setIsPlaying(true)
        }
    }

    const stop = async () => {
        console.log('Stop called')
        await cleanup()
        setIsLoading(false)
        setIsPlaying(false)
        setIsPaused(false)
    }

    const togglePlayPause = async () => {
        console.log('Toggle called, isPlaying:', isPlaying, 'isPaused:', isPaused)
        if (isPlaying) {
            await pause()
        } else if (isPaused) {
            await resume()
        }
    }

    return {
        call,
        pause,
        resume,
        stop,
        togglePlayPause,
        IsLoading,
        isPlaying,
        isPaused
    }
}