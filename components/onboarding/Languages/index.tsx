import { Languages as LanguageOptions } from "@/lib/lan";
import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

const Languages: React.FC = () => {
    const [selectedLanguage, setSelectedLanguage] = useState<string>('');

    const selectLanguage = (language: string) => {
        setSelectedLanguage(language);
    };

    const isLanguageSelected = (language: string) => {
        return selectedLanguage === language;
    };

    const renderLanguageOption = ({ item }: { item: string }) => {
        const isSelected = isLanguageSelected(item);
        return (
            <Pressable
                style={({ pressed }) => [
                    styles.dropdownOption,
                    isSelected && styles.dropdownOptionSelected,
                    pressed && styles.dropdownOptionPressed,
                ]}
                onPress={() => selectLanguage(item)}
            >
                <View style={[styles.radioButton, isSelected && styles.radioButtonSelected]}>
                    {isSelected && <View style={styles.radioButtonInner} />}
                </View>
                <Text
                    style={[
                        styles.dropdownOptionText,
                        isSelected && styles.dropdownOptionTextSelected,
                    ]}
                >
                    {item}
                </Text>
            </Pressable>
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.mainTitle}>Choose Your Language</Text>
                <Text style={styles.mainSubtitle}>
                    Select your preferred language to continue
                </Text>
            </View>

            <View style={styles.dropdownContainer}>
                <View style={styles.dropdown}>
                    <View style={styles.dropdownHeader}>
                        <Text style={styles.dropdownHeaderText}>
                            Available Languages
                        </Text>
                        {selectedLanguage !== '' && (
                            <View style={styles.selectedBadge}>
                                <Text style={styles.selectedBadgeText}>
                                    {selectedLanguage}
                                </Text>
                            </View>
                        )}
                    </View>
                    <FlatList
                        data={LanguageOptions}
                        renderItem={renderLanguageOption}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={styles.dropdownContent}
                        showsVerticalScrollIndicator={true}
                        scrollEnabled={true}
                        bounces={true}
                        keyboardShouldPersistTaps="handled"
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 0,
        margin: 0,
    },
    headerContainer: {
    },
    mainTitle: {

    },
    mainSubtitle: {

    },
    dropdownContainer: {

    },
    dropdown: {

    },
    dropdownHeader: {

    },
    dropdownHeaderText: {

    },
    selectedBadge: {

    },
    selectedBadgeText: {

    },
    dropdownContent: {

    },
    dropdownOption: {

    },
    dropdownOptionPressed: {

    },
    dropdownOptionSelected: {

    },
    radioButton: {

    },
    radioButtonSelected: {
        borderColor: '#3B82F6',
        borderWidth: 2,
    },
    radioButtonInner: {

    },
    dropdownOptionText: {

    },
    dropdownOptionTextSelected: {

    },
});

export default Languages;