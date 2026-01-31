import { router } from 'expo-router';
import { ArrowLeft } from "lucide-react-native";
import React from 'react';
import { Pressable, StyleSheet, Text, View } from "react-native";

const Header: React.FC = () => {
    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => router.back()}
                style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
            >
                <View style={styles.backButton}>
                    <ArrowLeft size={14} color="black" />
                    <Text style={styles.backText}>Back</Text>
                </View>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 30
    },
    backButton: {
        padding: 10,
        borderColor: "black",
        borderWidth: 1,
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 6,
        fontFamily: "Poppins_500Medium"
    },
    backText: {
        fontSize: 14,
        color: 'black',
    }
})

export default Header
