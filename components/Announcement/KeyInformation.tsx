import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'

type Props = {
    heading: string
    points: string[]
}

const KeyInformation: React.FC<Props> = ({ heading, points }) => {
    return (
        <View style={styles.container}>
            <View style={styles.headingContainer}>
                <Text style={styles.heading}>
                    {heading}
                </Text>
            </View>
            <View style={styles.pointsContainer}>
                {points.map((point, index) => (
                    <View key={index} style={styles.pointRow}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.pointText}>{point}</Text>
                    </View>
                ))}
            </View>
        </View>
    )
}

const { width } = Dimensions.get('window');
const isMediumScreen = width >= 768; // md breakpoint
const isLargeScreen = width >= 1024; // lg breakpoint

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        marginBottom: 16, // gap-2 equivalent
        width: "90%",
        alignSelf: "center",
        marginTop: 8
    },
    headingContainer: {
        marginBottom: 8,
    },
    heading: {
        fontSize: 19,
        fontWeight: '600',
        color: '#000',
        fontFamily: 'Roboto_700Bold',
    },
    pointsContainer: {
        flexDirection: 'column',
    },
    pointRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 8, // gap-2 between points
        width: isMediumScreen ? '75%' : '100%', // md:w-[75%]
    },
    bullet: {
        fontWeight: 'bold',
        color: '#000',
        marginRight: 8, // gap-2 between bullet and text
        fontSize: 16,
        lineHeight: isLargeScreen ? 32 : 28, // match text line height
    },
    pointText: {
        flex: 1, // takes remaining space
        color: '#000',
        lineHeight: isLargeScreen ? 32 : 28, // lg:leading-8 : leading-7,
        fontSize: 16,
        fontFamily: "poppins_400Regular"
    }
})

export default KeyInformation