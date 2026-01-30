import { lanContext } from '@/context/lan';
import { TranslateText } from "@/lib/translatetext";
import React, { useContext } from 'react';
import { StyleSheet, TextInput } from 'react-native';

type Props = {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const InputToggle: React.FC<Props> = ({ setVisible, visible }) => {

    const { lan } = useContext(lanContext);

    const handlePress = () => {
        setVisible((prev) => !prev);
    };

    return (
        <TextInput
            onPress={handlePress}
            style={styles.Input}
            onChange={handlePress}
            placeholder={TranslateText[lan].INPUT_PLACEHOLDER}
        />
    );
};

const styles = StyleSheet.create({
    Input: {
        width: "90%",
        height: 20,
        backgroundColor: "#FFFFFF",
        marginLeft: "auto",
        marginRight: "auto",
        padding: 20,
        fontFamily: "Montserrat_400Regular",
        borderRadius: 10,
    }
});

export default InputToggle;