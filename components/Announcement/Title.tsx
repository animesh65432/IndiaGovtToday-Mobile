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
        marginLeft: "auto",
        marginRight: "auto",
        flexShrink: 1
    },
    title: {
        fontFamily: "Roboto_700Bold",
        color: "black",
        fontSize: 22
    }
})

export default Title