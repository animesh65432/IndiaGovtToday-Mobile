import { GetallAnnoucementsDepartments } from '@/api/announcements';
import { Currentdate } from '@/context/Currentdate';
import { lanContext } from '@/context/lan';
import { TranslateText } from '@/lib/translatetext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Building2, Calendar as CalendarIcon, ChevronDown, MapPin } from 'lucide-react-native';
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const COLORS = {
    primary: '#EAB308',        // Main yellow/amber
    primaryLight: '#FDE047',   // Lighter yellow for subtle highlights
    primaryDark: '#CA8A04',    // Darker yellow for pressed states
    primaryAlpha: 'rgba(234, 179, 8, 0.08)', // Transparent yellow for backgrounds

    text: {
        primary: '#111827',      // Main text color
        secondary: '#6B7280',    // Secondary/muted text
        placeholder: '#9CA3AF',  // Placeholder text
        white: '#FFFFFF',        // White text for colored backgrounds
        onPrimary: '#78350F',    // Dark amber text for yellow backgrounds (better contrast)
    },

    background: {
        primary: '#FFFFFF',      // White background
        secondary: '#F9FAFB',    // Light gray background
        tertiary: '#F3F4F6',     // Lighter gray
        hover: '#FAFBFC',        // Subtle hover state
    },

    border: {
        light: '#F3F4F6',        // Lightest border
        default: '#E5E7EB',      // Default border
        medium: '#D1D5DB',       // Medium border
        dark: '#9CA3AF',         // Darker border
    },

    state: {
        selected: '#EAB308',     // Selected state (primary)
        hover: '#F3F4F6',        // Hover state
        pressed: '#E5E7EB',      // Pressed state
        disabled: '#F9FAFB',     // Disabled state
    }
};

interface RegionOption {
    label: string;
    value: string;
}

type SearchInputboxProps = {
    StatesSelected: string[];
    SetStatesSelected: React.Dispatch<React.SetStateAction<string[]>>;
    DeparmentsSelected: string;
    SetDeparmentsSelected: React.Dispatch<React.SetStateAction<string>>;
    onSearch: () => void;
};

const SearchInputbox: React.FC<SearchInputboxProps> = ({
    StatesSelected,
    SetStatesSelected,
    DeparmentsSelected,
    SetDeparmentsSelected,
    onSearch,
}) => {
    const [options, setOptions] = useState<string[]>([]);
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [showRegionPicker, setShowRegionPicker] = useState(false);
    const [showDepartmentPicker, setShowDepartmentPicker] = useState(false);

    const { lan } = useContext(lanContext);
    const { onChangeStartDate, startdate, endDate, onChangeEndDate } = useContext(Currentdate);

    useEffect(() => {
        const fetch = async () => {
            const res = (await GetallAnnoucementsDepartments(
                lan,
                startdate,
                endDate,
                StatesSelected
            )) as { data: string[] };
            if (res?.data) setOptions(res.data);
        };
        fetch();
    }, [lan, StatesSelected, startdate, endDate]);

    const toggleRegion = (region: string) => {
        if (StatesSelected.includes(region)) {
            SetStatesSelected(StatesSelected.filter((r) => r !== region));
        } else {
            SetStatesSelected([...StatesSelected, region]);
        }
    };

    const toggleAllRegions = () => {
        const allRegionValues = TranslateText[lan].MULTISELECT_OPTIONS.map((item: RegionOption) => item.value);
        if (StatesSelected.length === allRegionValues.length) {
            SetStatesSelected([]);
        } else {
            SetStatesSelected(allRegionValues);
        }
    };

    const handleDepartmentSelect = (dept: string) => {
        SetDeparmentsSelected(dept);
        setShowDepartmentPicker(false);
    };

    const handleStartDateChange = (event: any, selectedDate?: Date) => {
        setShowStartDatePicker(false);
        if (selectedDate) {
            onChangeStartDate(selectedDate);
        }
    };

    const handleEndDateChange = (event: any, selectedDate?: Date) => {
        setShowEndDatePicker(false);
        if (selectedDate) {
            onChangeEndDate(selectedDate);
        }
    };

    const getSelectedDepartmentLabel = () => {
        if (!DeparmentsSelected) return TranslateText[lan].ALL_DEPARMENTS;
        return DeparmentsSelected;
    };

    const getSelectedRegionLabel = () => {
        if (StatesSelected.length === 0) {
            return `${TranslateText[lan].SELECT_REGIONS}`;
        }
        const totalRegions = TranslateText[lan].MULTISELECT_OPTIONS.length;
        if (StatesSelected.length === totalRegions) {
            return `${TranslateText[lan].ALL_REGIONS}`;
        }
        return `${StatesSelected.length} ${TranslateText[lan].REGION}  ${TranslateText[lan].SELECTED}`;
    };

    const closeAllDropdowns = () => {
        setShowRegionPicker(false);
        setShowDepartmentPicker(false);
    };

    const renderRegionOption = ({ item }: { item: RegionOption }) => {
        const isSelected = StatesSelected.includes(item.value);
        return (
            <TouchableOpacity
                style={[
                    styles.dropdownOption,
                    isSelected && styles.dropdownOptionSelected,
                ]}
                onPress={() => toggleRegion(item.value)}
                activeOpacity={0.7}
            >
                <View style={[styles.checkbox, isSelected && styles.checkboxChecked]}>
                    {isSelected && (
                        <Text style={styles.checkmark}>✓</Text>
                    )}
                </View>
                <Text
                    style={[
                        styles.dropdownOptionText,
                        isSelected && styles.dropdownOptionTextSelected,
                    ]}
                >
                    {item.label}
                </Text>
            </TouchableOpacity>
        );
    };

    const renderDepartmentOption = ({ item, index }: { item: string; index: number }) => {
        if (index === 0) {
            const isSelected = !DeparmentsSelected;
            return (
                <TouchableOpacity
                    style={[
                        styles.dropdownOption,
                        isSelected && styles.dropdownOptionSelected,
                    ]}
                    onPress={() => handleDepartmentSelect('')}
                    activeOpacity={0.7}
                >
                    <View style={[styles.checkbox, isSelected && styles.checkboxChecked]}>
                        {isSelected && (
                            <Text style={styles.checkmark}>✓</Text>
                        )}
                    </View>
                    <Text
                        style={[
                            styles.dropdownOptionText,
                            isSelected && styles.dropdownOptionTextSelected,
                        ]}
                    >
                        {TranslateText[lan].ALL_DEPARMENTS}
                    </Text>
                </TouchableOpacity>
            );
        }

        const dept = item;
        const isSelected = DeparmentsSelected === dept;
        return (
            <TouchableOpacity
                style={[
                    styles.dropdownOption,
                    isSelected && styles.dropdownOptionSelected,
                ]}
                onPress={() => handleDepartmentSelect(dept)}
                activeOpacity={0.7}
            >
                <View style={[styles.checkbox, isSelected && styles.checkboxChecked]}>
                    {isSelected && (
                        <Text style={styles.checkmark}>✓</Text>
                    )}
                </View>
                <Text
                    style={[
                        styles.dropdownOptionText,
                        isSelected && styles.dropdownOptionTextSelected,
                    ]}
                >
                    {dept}
                </Text>
            </TouchableOpacity>
        );
    };

    const isAllRegionsSelected = StatesSelected.length === TranslateText[lan].MULTISELECT_OPTIONS.length;

    return (
        <View style={styles.container}>
            {/* Region Multi-Select */}
            <View style={styles.section}>
                <Text style={styles.label}>{TranslateText[lan].REGION}</Text>
                <Pressable
                    style={({ pressed }) => [
                        styles.selectButton,
                        pressed && styles.selectButtonPressed,
                        showRegionPicker && styles.selectButtonActive,
                    ]}
                    onPress={() => {
                        setShowDepartmentPicker(false);
                        setShowRegionPicker(!showRegionPicker);
                    }}
                >
                    <View style={styles.selectButtonContent}>
                        <MapPin size={20} color={showRegionPicker ? COLORS.primary : COLORS.text.secondary} style={styles.selectButtonIcon} />
                        <Text
                            style={[
                                styles.selectButtonText,
                                StatesSelected.length === 0 && styles.selectButtonPlaceholder,
                                showRegionPicker && styles.selectButtonTextActive,
                            ]}
                        >
                            {getSelectedRegionLabel()}
                        </Text>
                    </View>
                    <ChevronDown
                        size={20}
                        color={showRegionPicker ? COLORS.primary : COLORS.text.secondary}
                        style={[styles.chevron, showRegionPicker && styles.chevronRotated]}
                    />
                </Pressable>

                {showRegionPicker && (
                    <View style={styles.dropdownContainer}>
                        <View style={styles.dropdown}>
                            <View style={styles.dropdownHeader}>
                                <Text style={styles.dropdownHeaderText}>
                                    {StatesSelected.length === 0
                                        ? `${TranslateText[lan].SELECT_REGIONS}`
                                        : isAllRegionsSelected
                                            ? `${TranslateText[lan].ALL_REGIONS_SELECTED}`
                                            : `${StatesSelected.length} ${TranslateText[lan].SELECTED}`}
                                </Text>
                                <TouchableOpacity onPress={closeAllDropdowns}>
                                    <Text style={styles.doneButton}>{TranslateText[lan].DONE}</Text>
                                </TouchableOpacity>
                            </View>

                            {/* All Regions Option */}
                            <TouchableOpacity
                                style={[
                                    styles.dropdownOption,
                                    styles.allRegionsOption,
                                    isAllRegionsSelected && styles.dropdownOptionSelected,
                                ]}
                                onPress={toggleAllRegions}
                                activeOpacity={0.7}
                            >
                                <View style={[styles.checkbox, isAllRegionsSelected && styles.checkboxChecked]}>
                                    {isAllRegionsSelected && (
                                        <Text style={styles.checkmark}>✓</Text>
                                    )}
                                </View>
                                <Text
                                    style={[
                                        styles.dropdownOptionText,
                                        styles.allRegionsText,
                                        isAllRegionsSelected && styles.dropdownOptionTextSelected,
                                    ]}
                                >
                                    {TranslateText[lan].ALL_REGIONS}
                                </Text>
                            </TouchableOpacity>

                            {/* Separator */}
                            <View style={styles.separator} />

                            <FlatList
                                data={TranslateText[lan].MULTISELECT_OPTIONS}
                                renderItem={renderRegionOption}
                                keyExtractor={(item) => item.value}
                                contentContainerStyle={styles.dropdownContent}
                                showsVerticalScrollIndicator={true}
                                scrollEnabled={true}
                                bounces={true}
                                keyboardShouldPersistTaps="handled"
                            />
                        </View>
                    </View>
                )}
            </View>

            {/* Department Select */}
            <View style={styles.section}>
                <Text style={styles.label}>{TranslateText[lan].DEPTARTMENT}</Text>
                <Pressable
                    style={({ pressed }) => [
                        styles.selectButton,
                        pressed && styles.selectButtonPressed,
                        showDepartmentPicker && styles.selectButtonActive,
                    ]}
                    onPress={() => {
                        setShowRegionPicker(false);
                        setShowDepartmentPicker(!showDepartmentPicker);
                    }}
                >
                    <View style={styles.selectButtonContent}>
                        <Building2 size={20} color={showDepartmentPicker ? COLORS.primary : COLORS.text.secondary} style={styles.selectButtonIcon} />
                        <Text
                            style={[
                                styles.selectButtonText,
                                !DeparmentsSelected && styles.selectButtonPlaceholder,
                                showDepartmentPicker && styles.selectButtonTextActive,
                            ]}
                        >
                            {getSelectedDepartmentLabel()}
                        </Text>
                    </View>
                    <ChevronDown
                        size={20}
                        color={showDepartmentPicker ? COLORS.primary : COLORS.text.secondary}
                        style={[styles.chevron, showDepartmentPicker && styles.chevronRotated]}
                    />
                </Pressable>

                {showDepartmentPicker && (
                    <View style={styles.dropdownContainer}>
                        <View style={styles.dropdown}>
                            <View style={styles.dropdownHeader}>
                                <Text style={styles.dropdownHeaderText}>{TranslateText[lan].SELECT_DEPARTMENT}</Text>
                                <TouchableOpacity onPress={closeAllDropdowns}>
                                    <Text style={styles.doneButton}>{TranslateText[lan].DONE}</Text>
                                </TouchableOpacity>
                            </View>

                            <FlatList
                                data={['', ...options]}
                                renderItem={renderDepartmentOption}
                                keyExtractor={(item, index) => index.toString()}
                                contentContainerStyle={styles.dropdownContent}
                                showsVerticalScrollIndicator={true}
                                scrollEnabled={true}
                                bounces={true}
                                keyboardShouldPersistTaps="handled"
                            />
                        </View>
                    </View>
                )}
            </View>

            {/* Date Range */}
            <View style={styles.section}>
                <Text style={styles.label}>{TranslateText[lan].DATE_RANGE}</Text>
                <View style={styles.dateRangeContainer}>
                    <Pressable
                        style={({ pressed }) => [
                            styles.dateButton,
                            pressed && styles.dateButtonPressed,
                        ]}
                        onPress={() => setShowStartDatePicker(true)}
                    >
                        <CalendarIcon size={20} color={COLORS.text.secondary} style={styles.calendarIcon} />
                        <Text style={styles.dateButtonText}>
                            {startdate ? startdate.toLocaleDateString() : `${TranslateText[lan].FROM}`}
                        </Text>
                    </Pressable>

                    <Pressable
                        style={({ pressed }) => [
                            styles.dateButton,
                            pressed && styles.dateButtonPressed,
                        ]}
                        onPress={() => setShowEndDatePicker(true)}
                    >
                        <CalendarIcon size={20} color={COLORS.text.secondary} style={styles.calendarIcon} />
                        <Text style={styles.dateButtonText}>
                            {endDate ? endDate.toLocaleDateString() : `${TranslateText[lan].TO}`}
                        </Text>
                    </Pressable>
                </View>

                {showStartDatePicker && (
                    <DateTimePicker
                        value={startdate || new Date()}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={handleStartDateChange}
                    />
                )}

                {showEndDatePicker && (
                    <DateTimePicker
                        value={endDate || new Date()}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                        onChange={handleEndDateChange}
                    />
                )}
            </View>

            {/* Search Button */}
            <Pressable
                style={({ pressed }) => [
                    styles.searchButton,
                    pressed && styles.searchButtonPressed,
                ]}
                onPress={onSearch}
            >
                <Text style={styles.searchButtonText}>{TranslateText[lan].SEARCH}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 20,
    },
    section: {
        gap: 12,
        marginBottom: 24,
    },
    label: {
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
        color: COLORS.text.secondary,
        letterSpacing: 1.5,
        marginLeft: 4,
    },
    selectButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 56,
        backgroundColor: COLORS.background.secondary,
        borderRadius: 16,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: COLORS.border.default,
    },
    selectButtonPressed: {
        backgroundColor: COLORS.state.pressed,
    },
    selectButtonActive: {
        borderColor: COLORS.primary,
        backgroundColor: COLORS.primaryAlpha,
    },
    selectButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    selectButtonIcon: {
        marginRight: 12,
    },
    selectButtonText: {
        flex: 1,
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.text.primary,
        fontFamily: 'Poppins_500Medium',
    },
    selectButtonTextActive: {
        color: COLORS.primary,
    },
    selectButtonPlaceholder: {
        color: COLORS.text.placeholder,
    },
    chevron: {
        marginLeft: 8,
    },
    chevronRotated: {
        transform: [{ rotate: '180deg' }],
    },
    dropdownContainer: {
        marginTop: 8,
        marginBottom: 16,
    },
    dropdown: {
        backgroundColor: COLORS.background.primary,
        borderRadius: 16,
        height: 280,
        borderWidth: 1,
        borderColor: COLORS.border.default,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 8,
    },
    dropdownHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border.light,
        backgroundColor: COLORS.background.hover,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    dropdownHeaderText: {
        fontSize: 12,
        fontWeight: '600',
        color: COLORS.text.secondary,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        fontFamily: 'Poppins_500Medium',
    },
    doneButton: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.primary,
        fontFamily: 'Poppins_500Medium',
    },
    allRegionsOption: {
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border.light,
        marginBottom: 4,
        paddingBottom: 16,
    },
    allRegionsText: {
        fontWeight: '700',
    },
    separator: {
        height: 1,
        backgroundColor: COLORS.border.default,
        marginHorizontal: 8,
        marginVertical: 4,
    },
    dropdownContent: {
        padding: 4,
    },
    dropdownOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        gap: 12,
        borderRadius: 10,
        marginHorizontal: 4,
        marginVertical: 2,
    },
    dropdownOptionSelected: {
        backgroundColor: COLORS.primaryAlpha,
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: COLORS.border.medium,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.background.primary,
    },
    checkboxChecked: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    checkmark: {
        color: COLORS.text.white,
        fontSize: 13,
        fontWeight: '700',
    },
    dropdownOptionText: {
        flex: 1,
        fontSize: 15,
        fontWeight: '500',
        color: COLORS.text.primary,
        fontFamily: 'Poppins_400Regular',
    },
    dropdownOptionTextSelected: {
        color: COLORS.primary,
        fontWeight: '600',
    },
    dateRangeContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    dateButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        backgroundColor: COLORS.background.secondary,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: COLORS.border.default,
        paddingHorizontal: 16,
    },
    dateButtonPressed: {
        backgroundColor: COLORS.state.pressed,
    },
    calendarIcon: {
        marginRight: 8,
    },
    dateButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.text.primary,
        fontFamily: 'Poppins_500Medium',
    },
    searchButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 56,
        backgroundColor: COLORS.primary,
        borderRadius: 16,
        gap: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 6,
    },
    searchButtonPressed: {
        transform: [{ scale: 0.98 }],
        opacity: 0.9,
        backgroundColor: COLORS.primaryDark,
    },
    searchButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.text.white,
        letterSpacing: 0.5,
        fontFamily: 'Poppins_500Medium',
    },
});

export default SearchInputbox;