import { lanContext } from "@/context/lan";
import { optionsforLanguages } from "@/lib/lan";
import { Globe } from "lucide-react-native";
import React, { useContext } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const Header: React.FC = () => {
    const { setLan, lan } = useContext(lanContext);
    return (
        <View style={styles.container}>
            <View style={styles.logoWrapper}>
                <Image
                    source={require('../assets/Icon.png')}
                    style={styles.logo}
                />
            </View>
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
                        color="black"
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
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
        fontFamily: 'Poppins_400Regular',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 40,
    },
    logoWrapper: {
    },
    logo: {
        width: 180,
        height: 60,
        resizeMode: "cover",
    },
    dropdownWrapper: {
        width: 120,
        minWidth: 100,
        marginRight: 10,
    },
    dropdown: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        fontFamily: 'Poppins_400Regular',
        borderRadius: 12,
    },
    selectedText: {
        fontSize: 13,
        color: 'black',
        textTransform: "uppercase",
        fontWeight: '500',
        fontFamily: "Poppins_500Medium"
    },
    placeholder: {
        fontSize: 13,
        color: 'black',
        textTransform: "uppercase",
        fontWeight: '500',
        fontFamily: "Poppins_500Medium"
    },
    dropdownContainer: {
        borderRadius: 8,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    itemText: {
        fontSize: 13,
        fontWeight: '600'
    },
    iconWrapper: {
        marginRight: 8,
    }
});

export default Header;