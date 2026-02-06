import { ArrowRight } from "lucide-react-native";
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
    handlePageChange: (index: number) => void;
}

const { width } = Dimensions.get('window');

const Welcome: React.FC<Props> = ({ handlePageChange }) => {
    return (
        <View style={styles.container}>

            <Image
                source={require("../../../assets/applogo.png")}
                style={styles.logo}
                resizeMode="contain"
            />

            <View style={styles.textContainer}>
                <Text style={styles.title}>
                    Welcome to{'\n'}
                    <Text style={styles.titleHighlight}>IndiaGovtToday</Text>
                </Text>
                <Text style={styles.subtitle}>
                    The latest news from the government, simplified for you.
                </Text>
            </View>

            <View style={styles.bottomSection}>
                <TouchableOpacity
                    style={styles.getStartedButton}
                    onPress={() => handlePageChange(1)}
                    activeOpacity={0.9}
                >
                    <Text style={styles.getStartedText}>Get Started</Text>
                    <ArrowRight size={20} color="#000" style={{ marginLeft: 8 }} />
                </TouchableOpacity>

                <Text style={styles.disclaimer}>
                    By continuing, you agree to our Terms and Privacy Policy
                </Text>
            </View>

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        marginTop: 160,
        backgroundColor: "#fff",
    },
    logo: {
        width: 180,
        height: 120,
        alignSelf: "center",
    },
    textContainer: {
        flexDirection: "column",
        gap: 16,
    },
    title: {
        fontSize: 28,
        fontFamily: "Poppins_600SemiBold",
        color: "black",
        alignSelf: "center",
        textAlign: "center"
    },
    titleHighlight: {
        color: "#FBBF24",
        fontSize: 28,
        fontFamily: "Poppins_600SemiBold",
        alignSelf: "center",
        textDecorationLine: "underline",
    },
    subtitle: {
        fontSize: 16,
        fontFamily: "Poppins_400Regular",
        color: "#4B5563",
        alignSelf: "center",
        width: width * 0.8,
        textAlign: "center",
    },
    bottomSection: {
        alignSelf: "center",
        marginTop: "auto",
        marginBottom: 40,
        flexDirection: "column",
        gap: 12,
    },
    getStartedButton: {
        backgroundColor: "#FBBF24",
        width: width * 0.6,
        borderRadius: 8,
        display: "flex",
        flexDirection: "row",
        alignSelf: "center",
        padding: 14,
        justifyContent: "center",
        alignItems: "center",
    },
    getStartedText: {
        fontSize: 16,
        fontFamily: "Poppins_500Medium",
        color: "#000",
    },
    disclaimer: {
        fontSize: 12,
        fontFamily: "Poppins_400Regular",
        color: "#6B7280",
        width: "auto"
    }
});

export default Welcome;