import data from "@/data.json"
import React from 'react'
import { StyleSheet, View, } from "react-native"
import Annoucment from './Annoucment'

const Annoucements: React.FC = () => {
    return (
        <View style={style.Container}>
            {data.map((item) =>
                <Annoucment
                    announcement={item}
                    key={item.announcementId}
                />)
            }
        </View>
    )
}

const style = StyleSheet.create({
    Container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflowX: "auto",
        gap: 15
    }
})


export default Annoucements