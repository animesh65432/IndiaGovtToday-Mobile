import { lanContext } from '@/context/lan';
import { usetexttospech } from "@/hooks/usetexttospech";
import { TranslateText } from '@/lib/translatetext';
import { ShowAnnouncementTypes } from "@/types";
import { router } from 'expo-router';
import { ArrowLeft, Pause, Play, Share2, Square, Volume2 } from "lucide-react-native";
import React, { useContext } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
    toggleShare: boolean,
    setToggleShare: React.Dispatch<React.SetStateAction<boolean>>,
    Annoucment: ShowAnnouncementTypes,
    audioHook: ReturnType<typeof usetexttospech>
}

const Header: React.FC<Props> = ({ setToggleShare, Annoucment, audioHook }) => {
    const { lan } = useContext(lanContext);
    const { call, stop, togglePlayPause, IsLoading, isPlaying, isPaused } = audioHook

    const handleAudioAction = async () => {
        console.log('handleAudioAction called')
        if (IsLoading) {
            console.log('IsLoading true, returning')
            return
        }

        if (isPlaying || isPaused) {
            console.log('Toggling play/pause')
            await togglePlayPause()
            return
        }

        const fullText = Annoucment.sections[0].heading + ". " +
            ('content' in Annoucment.sections[0] ? Annoucment.sections[0].content : '') + " " +
            Annoucment.sections[1].heading + ". " +
            ('content' in Annoucment.sections[1] ? Annoucment.sections[1].content : '') + " " +
            Annoucment.sections[2].heading + ". " +
            (Annoucment.sections[2].type === "keypoints" && 'points' in Annoucment.sections[2] ?
                Annoucment.sections[2].points.join('. ') : '')

        await call(fullText)
    }

    const handleStopAudio = () => {
        console.log('handleStopAudio called')
        stop()
    }

    const getAudioIcon = () => {
        console.log('getAudioIcon - IsLoading:', IsLoading, 'isPaused:', isPaused, 'isPlaying:', isPlaying)

        if (IsLoading) return <ActivityIndicator size="small" color="#2d2d2d" />
        if (isPaused) return <Play size={24} color="#2d2d2d" />
        if (isPlaying) return <Pause size={24} color="#2d2d2d" />
        return <Volume2 size={24} color="#2d2d2d" />
    }

    console.log(TranslateText[lan].BACK)

    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => router.back()}
                style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
            >
                <View style={styles.backButton}>
                    <ArrowLeft size={14} color="black" />
                    <Text style={styles.backText}>{TranslateText[lan].BACK}</Text>
                </View>
            </Pressable>

            <View style={styles.controlsContainer}>
                <TouchableOpacity
                    onPress={() => setToggleShare((prev) => !prev)}
                    activeOpacity={0.7}
                    style={styles.iconButton}
                >
                    <Share2 size={24} color="#2d2d2d" />
                </TouchableOpacity>

                {(isPlaying || isPaused) && (
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={handleStopAudio}
                        activeOpacity={0.7}
                        accessibilityLabel="Stop audio"
                    >
                        <Square size={24} color="#2d2d2d" />
                    </TouchableOpacity>
                )}

                <TouchableOpacity
                    style={[styles.iconButton, IsLoading && styles.disabled]}
                    onPress={handleAudioAction}
                    disabled={IsLoading}
                    activeOpacity={0.7}
                    accessibilityLabel={isPlaying ? "Pause audio" : "Play audio"}
                >
                    {getAudioIcon()}
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    backButton: {
        padding: 10,
        borderColor: "#e5e5e5",
        borderWidth: 1,
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 6,
        borderRadius: 8,
    },
    backText: {
        fontSize: 14,
        color: 'black',
        fontFamily: "Poppins_500Medium"
    },
    controlsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconButton: {
        padding: 8,
    },
    disabled: {
        opacity: 0.6,
    }
})

export default Header