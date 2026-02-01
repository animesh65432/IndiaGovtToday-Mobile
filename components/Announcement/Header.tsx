import { lanContext } from '@/context/lan';
import { TranslateText } from "@/lib/translatetext";
import { router } from 'expo-router';
import { ArrowLeft, Share2 } from "lucide-react-native";
import React, { useContext } from 'react';
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
    toggleShare: boolean,
    setToggleShare: React.Dispatch<React.SetStateAction<boolean>>
}

const Header: React.FC<Props> = ({ toggleShare, setToggleShare }) => {
    const { lan } = useContext(lanContext);
    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => router.back()}
                style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
            >
                <View style={styles.backButton}>
                    <ArrowLeft size={14} color="black" />
                    <Text style={styles.backText}>{TranslateText[lan].BACK}</Text>
                </View>
            </Pressable>
            <View>
                <Share2 onPress={() => setToggleShare((prev) => !prev)} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: 50,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
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
