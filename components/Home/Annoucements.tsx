import data from "@/data.json"
import React from 'react'
import { ScrollView, StyleSheet, View } from "react-native"
import Annoucment from './Annoucment'

const Annoucements: React.FC = () => {
    return (
        <ScrollView style={style.Container}>
            <View style={style.Inner}>
                {data.map((item) =>
                    <Annoucment
                        announcement={item}
                        key={item.announcementId}
                    />)
                }
            </View>
        </ScrollView>
    )
}

const style = StyleSheet.create({
    Container: {
        flex: 1,
    },
    Inner: {
        flexDirection: "column",
        gap: 15,
    }
})

export default Annoucements