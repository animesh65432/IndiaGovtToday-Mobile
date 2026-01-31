import { lanContext } from "@/context/lan";
import { optionsforLanguages } from "@/lib/lan";
import { Globe } from "lucide-react-native";
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const Header: React.FC = () => {
    const { setLan, lan } = useContext(lanContext);
    return (
        <View style={styles.container}>
            <View style={styles.dropdownWrapper}>
                <Dropdown
                    data={optionsforLanguages}
                    labelField="label"
                    valueField="value"
                    placeholder={lan}
                    value={lan}
                    onChange={item => {
                        setLan(item.label);
                    }}
                    style={styles.dropdown}
                    selectedTextStyle={styles.selectedText}
                    placeholderStyle={styles.placeholder}
                    containerStyle={styles.dropdownContainer}
                    itemTextStyle={styles.itemText}
                    renderRightIcon={() => null}
                    renderInputSearch={() => null}
                    renderLeftIcon={() => <Globe
                        height={15}
                        width={15}
                        style={styles.iconWrapper}
                        color="#1C3257"
                    />}
                    search
                    searchPlaceholder="English"
                    maxHeight={300}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "95%",
        marginLeft: "auto",
        marginRight: "auto",
        fontFamily: 'Poppins_400Regular',
    },
    dropdownWrapper: {
        alignSelf: 'flex-end',
        marginRight: 30,
        marginTop: 50,
        width: 100,
        flexShrink: 1,
        minWidth: 100,

    },
    dropdown: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        textTransform: "uppercase",
        flexDirection: 'row',
        alignItems: 'center',

    },
    selectedText: {
        fontSize: 13,
        color: '#1C3257',
        textTransform: "uppercase",
        fontWeight: 500
    },
    placeholder: {
        fontSize: 13,
        color: '#1C3257',
        textTransform: "uppercase",
        fontWeight: 500
    },
    dropdownContainer: {
        borderRadius: 8,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        textTransform: "uppercase"
    },
    itemText: {
        fontSize: 13,
        fontWeight: 600
    },
    iconWrapper: {
        marginRight: 8,
        justifyContent: 'center',
        alignItems: 'center',
        color: "#1C3257"
    }
});

export default Header;