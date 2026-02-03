import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

type Props = {
    title: string
}

const Title: React.FC<Props> = ({ title }) => {
    return (
        <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        width: "90%",
        flexShrink: 1,
        alignSelf: "center"
    },
    title: {
        color: "black",
        fontSize: 20,
        fontFamily: "Poppins_600SemiBold",
    }
})

export default Title