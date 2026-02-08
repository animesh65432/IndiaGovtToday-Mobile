import { TextGenerateEffect } from "@/components/ui/Textgenerateeffect"
import { lanContext } from '@/context/lan'
import { TranslateText } from "@/lib/translatetext"
import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'

const HeadingAndTitle: React.FC = () => {
    const { lan } = useContext(lanContext);
    return (
        <View style={styles.container}>
            <View style={styles.TextTitleAndDes}>
                <View style={styles.Titles}>
                    <Text style={styles.HeadingText}>{TranslateText[lan].PUBLIC_NOTIFICATION.split(" ")[0]}</Text>
                    <Text style={styles.HeadingText}>{TranslateText[lan].PUBLIC_NOTIFICATION.split(" ")[1]}</Text>
                </View>
                <TextGenerateEffect
                    words={TranslateText[lan].DIRECT_ACCESS_TO_VERIFIED_GOVT_CIRCULARS}
                    duration={0.5}
                    textStyle={styles.DescriptionText}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "column",
        marginTop: 50,
    },
    TextTitleAndDes: {
        display: "flex",
        flexDirection: "column",
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        gap: 10
    },
    Titles: {
        display: "flex",
        flexDirection: "column",
    },
    HeadingText: {
        fontSize: 24,
        lineHeight: 30,
        fontWeight: "600",
        color: "#2C2C2C",
        fontFamily: 'Poppins_600SemiBold',
        textTransform: "uppercase",
        marginRight: "auto",
        flexShrink: 1,
    },
    DescriptionText: {
        fontSize: 14,
        fontWeight: 300,
        color: "#2C2C2C",
        fontFamily: 'Poppins_400Regular',
        textTransform: "uppercase",
        letterSpacing: 0.5,
        lineHeight: 20,
    }
})

export default HeadingAndTitle