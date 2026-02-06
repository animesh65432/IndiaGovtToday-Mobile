import { ArrowRight } from "lucide-react-native";
import React, { useState } from 'react';
import { Dimensions, FlatList, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LanguageOptions } from "../../../lib/lan";

type props = {
    handlePageChange: (index: number) => void;
}
const { width } = Dimensions.get('window');

const Languages: React.FC<props> = ({ handlePageChange }) => {
    const [selectedLanguage, setSelectedLanguage] = useState<string>('');

    const selectLanguage = (language: string) => {
        setSelectedLanguage(language);
    };

    const isLanguageSelected = (language: string) => {
        return selectedLanguage === language;
    };

    const renderLanguageOption = ({ item }: { item: { label: string, value: string } }) => {
        const isSelected = isLanguageSelected(item.label);
        return (
            <Pressable
                style={styles.dropdownOption}
                onPress={() => selectLanguage(item.label)}
            >
                <View style={styles.dropdownOptionTextContainer}>
                    <Text
                        style={styles.dropdownOptionText}
                    >
                        {item.label}
                    </Text>
                    <Text style={styles.dropdownOptionValue}>
                        {item.value}
                    </Text>
                </View>
                <View style={[styles.radioButton, isSelected && styles.radioButtonSelected]}>
                    {isSelected && <View style={styles.radioButtonInner} />}
                </View>
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.mainTitle}>Choose Language</Text>
                <Text style={styles.mainSubtitle}>
                    Select your preferred language to continue
                </Text>
            </View>

            <View style={styles.dropdownContainer}>
                <FlatList
                    data={LanguageOptions}
                    renderItem={renderLanguageOption}
                    keyExtractor={(item, index) => index.toString()}
                    contentContainerStyle={styles.dropdownContent}
                    showsVerticalScrollIndicator={true}
                    scrollEnabled={true}
                    bounces={true}
                    keyboardShouldPersistTaps="handled"
                    style={styles.dropdown}
                />
            </View>
            <TouchableOpacity style={styles.continueButton} onPress={() => handlePageChange(2)}>
                <Text style={styles.ButtonText}>
                    Continue
                </Text>
                <ArrowRight />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 60,
        flexDirection: "column",
        gap: 20,
    },
    headerContainer: {
        marginBottom: 24,
        alignItems: 'center',
    },
    mainTitle: {
        fontSize: 28,
        fontWeight: "bold",
        fontFamily: "Poppins_600SemiBold",
        textAlign: 'center',
        color: '#1a1a1a',
        lineHeight: 36,
        letterSpacing: 0.5,
        marginBottom: 5,
    },
    mainSubtitle: {
        fontFamily: "Poppins_400Regular",
        fontSize: 14,
        textAlign: 'center',
        color: '#666',
        lineHeight: 24
    },
    dropdownContainer: {
        width: "100%",
        height: "60%",
    },
    dropdown: {
        flexDirection: "column",
    },
    dropdownHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: '#fbbf24',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e7eb',
    },
    dropdownHeaderText: {
        fontFamily: "Poppins_500Medium",
        fontSize: 16,
        color: '#1a1a1a',
    },
    selectedBadge: {
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
    },
    selectedBadgeText: {
        fontFamily: "Poppins_500Medium",
        fontSize: 12,
        color: '#1a1a1a',
    },
    dropdownContent: {
        paddingVertical: 2,
    },
    dropdownOption: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "90%",
        justifyContent: 'space-between',
        paddingBottom: 20,
        borderColor: "#e5e7eb",
        borderWidth: 1,
        alignSelf: "center",
        borderRadius: 8,
        padding: 8,
        marginBottom: 18,
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#d1d5db',
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioButtonSelected: {
        borderColor: '#fbbf24',
        borderWidth: 2,
    },
    radioButtonInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#fbbf24',
    },
    dropdownOptionText: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 15,
        color: 'black',
        fontWeight: "bold"
    },
    dropdownOptionTextSelected: {
        fontFamily: "Poppins_500Medium",
        color: '#1a1a1a',
    },
    continueButton: {
        backgroundColor: "#FBBF24",
        width: width * 0.6,
        borderRadius: 8,
        display: "flex",
        flexDirection: "row",
        alignSelf: "center",
        padding: 14,
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        marginBottom: 20,
    },
    ButtonText: {
        fontSize: 16,
        fontFamily: "Poppins_500Medium",
        color: "#000",
    },
    dropdownOptionTextContainer: {
        flexDirection: "column",
        gap: 8,
    },
    dropdownOptionValue: {
        fontFamily: "Poppins_400Regular",
        fontSize: 14,
        color: '#666',
    }
});

export default Languages;