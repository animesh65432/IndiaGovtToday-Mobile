import { lanContext } from '@/context/lan';
import { TranslateText } from "@/lib/translatetext";
import { Search } from 'lucide-react-native';
import React, { useContext } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

type Props = {
    SearchInput: string,
    SetSearchInput: React.Dispatch<React.SetStateAction<string>>,
};

const Input: React.FC<Props> = ({ SearchInput, SetSearchInput }) => {
    const { lan } = useContext(lanContext);

    return (
        <View style={styles.InputContainer}>
            <Search
                size={20}
                color="#666"
                style={styles.SearchIcon}
            />
            <TextInput
                style={styles.Input}
                placeholder={TranslateText[lan].INPUT_PLACEHOLDER}
                placeholderTextColor="#999"
                onChange={(e) => SetSearchInput(e.nativeEvent.text)}
                value={SearchInput}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    InputContainer: {
        width: "90%",
        marginLeft: "auto",
        marginRight: "auto",
        position: "relative",
        justifyContent: "center",
    },
    Input: {
        width: "100%",
        height: 50,
        backgroundColor: "#FFFFFF",
        paddingVertical: 12,
        paddingLeft: 45,
        paddingRight: 15,
        fontFamily: "Poppins_400Regular",
        borderRadius: 10,
        fontSize: 14,
    },
    SearchIcon: {
        position: "absolute",
        left: 15,
        zIndex: 1,
    },
});

export default Input;