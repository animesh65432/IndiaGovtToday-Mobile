import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type Props = {
    heading: string
    content: string
}

const TextDiv: React.FC<Props> = ({ heading, content }) => {
    return (
        <View style={styles.container}>
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>
                    {heading}
                </Text>
            </View>
            <Text style={styles.content}>{content}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        width: "90%",
        alignSelf: "center",
        marginTop: 8
    },
    headingContainer: {
        marginBottom: 8, // spacing between heading and content
    },
    heading: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        fontFamily: 'Roboto_700Bold', // if you're using this font
    },
    content: {
        color: '#000',
        lineHeight: 32, // leading-7 (7 * 4 = 28px)
        width: '100%',
        fontSize: 16,
        fontFamily: "poppins_400Regular"
    }
})

export default TextDiv