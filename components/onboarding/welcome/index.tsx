import React from 'react';
import { Image, StyleSheet, Text, View } from "react-native";

const Welcome = () => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={require("../../../assets/applogo.png")}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.title}>
                    Welcome to{'\n'}IndiaGovtToday
                </Text>
                <Text style={styles.subtitle}>
                    Get the latest updates from the government in one place
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
        backgroundColor: '#fff',
    },
    imageContainer: {
        alignItems: 'center',
    },
    logo: {
        width: 180,
        height: 120,
        resizeMode: "cover"
    },
    textContainer: {
        flexDirection: "column",
        gap: 16,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        fontFamily: "Poppins_600SemiBold",
        textAlign: 'center',
        color: '#1a1a1a',
        lineHeight: 36,
        letterSpacing: 0.5,
    },
    subtitle: {
        fontFamily: "Poppins_400Regular",
        fontSize: 16,
        textAlign: 'center',
        color: '#666',
        lineHeight: 24,
        paddingHorizontal: 20,
    }
})

export default Welcome;