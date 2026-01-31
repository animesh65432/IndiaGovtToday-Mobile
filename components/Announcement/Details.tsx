import { formatDateInLanguage } from '@/lib/fromDate'
import { LANGUAGE_CODES } from '@/lib/lan'
import { TranslateText } from "@/lib/translatetext"
import { Calendar, Landmark, LayoutGrid, Link, MapPin } from 'lucide-react-native'
import React from 'react'
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type Props = {
    lan: string,
    state: string,
    date: string,
    category: string,
    department: string,
    source: string
}

const Details: React.FC<Props> = ({ lan, date, source, state, department, category }) => {

    const openUrl = async () => {
        const supported = await Linking.canOpenURL(source)
        if (supported) {
            await Linking.openURL(source)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Calendar size={16} color="#1e293b" />
                <Text style={styles.text}>{formatDateInLanguage(date, LANGUAGE_CODES[lan])}</Text>
            </View>

            <View style={styles.row}>
                <MapPin size={16} color="#1e293b" />
                <Text style={styles.text}>{state}</Text>
            </View>

            <View style={styles.row}>
                <Landmark size={16} color="#1e293b" />
                <Text style={styles.text}>{department}</Text>
            </View>

            <View style={styles.row}>
                <LayoutGrid size={16} color="#1e293b" />
                <Text style={styles.text}>{category}</Text>
            </View>

            <TouchableOpacity style={styles.row} onPress={openUrl}>
                <Link size={16} color="#1e293b" />
                <Text style={styles.linkText}>{TranslateText[lan].VIEW_OFFICIAL_SOURCE}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#000000',
        padding: 20,
        backgroundColor: '#ffffff',
        gap: 8,
        width: '90%',
        marginLeft: "auto",
        marginRight: "auto",
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    text: {
        color: '#1e293b',
        fontSize: 14,
    },
    linkText: {
        color: '#1e293b',
        fontSize: 14,
        textDecorationLine: 'underline',
    },
})

export default Details