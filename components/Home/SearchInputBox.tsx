import { GetallAnnoucementsDepartments } from '@/api/announcements';
import { Currentdate } from '@/context/Currentdate';
import { lanContext } from '@/context/lan';
import { TranslateText } from '@/lib/translatetext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Building2, Calendar as CalendarIcon, ChevronRight, MapPin, Search } from 'lucide-react-native';
import React, { useContext, useEffect, useState } from 'react';
import {
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

type MobileSearchInputboxProps = {
    StatesSelected: string[];
    SetStatesSelected: React.Dispatch<React.SetStateAction<string[]>>;
    DeparmentsSelected: string;
    SetDeparmentsSelected: React.Dispatch<React.SetStateAction<string>>;
    SearchInput: string;
    SetSearchInput: React.Dispatch<React.SetStateAction<string>>;
    onSearch: () => void;
};

const MobileSearchInputbox: React.FC<MobileSearchInputboxProps> = ({
    StatesSelected,
    SetStatesSelected,
    DeparmentsSelected,
    SetDeparmentsSelected,
    SearchInput,
    SetSearchInput,
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

    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentContainer}
        >
            {/* Keyword Search */}
            <View style={styles.section}>
                <Text style={styles.label}>{TranslateText[lan].KEYWORDS}</Text>
                <View style={styles.searchInputContainer}>
                    <Search
                        size={18}
                        color="#9CA3AF"
                        style={styles.searchIcon}
                    />
                    <TextInput
                        style={styles.searchInput}
                        placeholder={TranslateText[lan].INPUT_PLACEHOLDER}
                        placeholderTextColor="#9CA3AF"
                        value={SearchInput}
                        onChangeText={SetSearchInput}
                    />
                </View>
            </View>

            {/* Region Multi-Select */}
            <View style={styles.section}>
                <Text style={styles.label}>{TranslateText[lan].REGION}</Text>
                <Pressable
                    style={styles.selectButton}
                    onPress={() => setShowRegionPicker(!showRegionPicker)}
                >
                    <MapPin size={18} color="#9CA3AF" style={styles.selectButtonIcon} />
                    <Text style={[
                        styles.selectButtonText,
                        StatesSelected.length === 0 && styles.selectButtonPlaceholder
                    ]}>
                        {StatesSelected.length > 0
                            ? `${StatesSelected.length} region${StatesSelected.length > 1 ? 's' : ''} selected`
                            : 'Select Regions'}
                    </Text>
                    <ChevronRight size={18} color="#9CA3AF" />
                </Pressable>

                {showRegionPicker && (
                    <View style={styles.dropdown}>
                        <ScrollView style={styles.dropdownScroll}>
                            {TranslateText[lan].MULTISELECT_OPTIONS.map((option: any) => (
                                <Pressable
                                    key={option.value}
                                    style={styles.dropdownOption}
                                    onPress={() => toggleRegion(option.value)}
                                >
                                    <View
                                        style={[
                                            styles.checkbox,
                                            StatesSelected.includes(option.value) &&
                                            styles.checkboxChecked,
                                        ]}
                                    >
                                        {StatesSelected.includes(option.value) && (
                                            <Text style={styles.checkmark}>✓</Text>
                                        )}
                                    </View>
                                    <Text style={styles.dropdownOptionText}>
                                        {option.label}
                                    </Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                    </View>
                )}
            </View>

            {/* Department Select */}
            <View style={styles.section}>
                <Text style={styles.label}>{TranslateText[lan].DEPTARTMENT}</Text>
                <Pressable
                    style={styles.selectButton}
                    onPress={() => setShowDepartmentPicker(!showDepartmentPicker)}
                >
                    <Building2 size={18} color="#9CA3AF" style={styles.selectButtonIcon} />
                    <Text style={[
                        styles.selectButtonText,
                        !DeparmentsSelected && styles.selectButtonPlaceholder
                    ]}>
                        {getSelectedDepartmentLabel()}
                    </Text>
                    <ChevronRight size={18} color="#9CA3AF" />
                </Pressable>

                {showDepartmentPicker && (
                    <View style={styles.dropdown}>
                        <ScrollView style={styles.dropdownScroll}>
                            <Pressable
                                style={styles.dropdownOption}
                                onPress={() => handleDepartmentSelect('')}
                            >
                                <View
                                    style={[
                                        styles.checkbox,
                                        !DeparmentsSelected && styles.checkboxChecked,
                                    ]}
                                >
                                    {!DeparmentsSelected && (
                                        <Text style={styles.checkmark}>✓</Text>
                                    )}
                                </View>
                                <Text style={styles.dropdownOptionText}>
                                    {TranslateText[lan].ALL_DEPARMENTS}
                                </Text>
                            </Pressable>
                            {options.map((dept) => (
                                <Pressable
                                    key={dept}
                                    style={styles.dropdownOption}
                                    onPress={() => handleDepartmentSelect(dept)}
                                >
                                    <View
                                        style={[
                                            styles.checkbox,
                                            DeparmentsSelected === dept && styles.checkboxChecked,
                                        ]}
                                    >
                                        {DeparmentsSelected === dept && (
                                            <Text style={styles.checkmark}>✓</Text>
                                        )}
                                    </View>
                                    <Text style={styles.dropdownOptionText}>
                                        {dept}
                                    </Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                    </View>
                )}
            </View>

            {/* Date Range */}
            <View style={styles.section}>
                <Text style={styles.label}>{TranslateText[lan].DATE_RANGE}</Text>
                <View style={styles.dateRangeContainer}>
                    {/* Start Date */}
                    <Pressable
                        style={styles.dateButton}
                        onPress={() => setShowStartDatePicker(true)}
                    >
                        <CalendarIcon size={16} color="#9CA3AF" style={styles.calendarIcon} />
                        <Text style={styles.dateButtonText}>
                            {startdate ? startdate.toLocaleDateString() : 'From'}
                        </Text>
                    </Pressable>

                    {/* End Date */}
                    <Pressable
                        style={styles.dateButton}
                        onPress={() => setShowEndDatePicker(true)}
                    >
                        <CalendarIcon size={16} color="#9CA3AF" style={styles.calendarIcon} />
                        <Text style={styles.dateButtonText}>
                            {endDate ? endDate.toLocaleDateString() : 'To'}
                        </Text>
                    </Pressable>
                </View>

                {/* Date Pickers */}
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
                <Text style={styles.searchButtonText}>
                    {TranslateText[lan].SEARCH}
                </Text>
                <ChevronRight size={20} color="#FFFFFF" />
            </Pressable>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        gap: 32,
        paddingBottom: 20,
    },
    section: {
        gap: 12,
    },
    label: {
        fontSize: 12,
        fontWeight: '700',
        textTransform: 'uppercase',
        color: '#9CA3AF',
        letterSpacing: 1.5,
        marginLeft: 4,
    },

    // Search Input
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        backgroundColor: '#F9FAFB',
        borderRadius: 16,
        paddingHorizontal: 16,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#111827',
    },

    // Unified Select Button (for both Region and Department)
    selectButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 56,
        backgroundColor: '#F9FAFB',
        borderRadius: 16,
        paddingHorizontal: 16,
    },
    selectButtonIcon: {
        marginRight: 12,
    },
    selectButtonText: {
        flex: 1,
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },
    selectButtonPlaceholder: {
        color: '#9CA3AF',
    },

    // Unified Dropdown (for both Region and Department)
    dropdown: {
        marginTop: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        maxHeight: 300,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        // Shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
    },
    dropdownScroll: {
        padding: 8,
    },
    dropdownOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        gap: 12,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#D1D5DB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxChecked: {
        backgroundColor: '#3B82F6',
        borderColor: '#3B82F6',
    },
    checkmark: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '700',
    },
    dropdownOptionText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },

    // Date Range
    dateRangeContainer: {
        flexDirection: 'row',
        gap: 12,
    },
    dateButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        backgroundColor: '#F9FAFB',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#F3F4F6',
        paddingHorizontal: 16,
    },
    calendarIcon: {
        marginRight: 8,
    },
    dateButtonText: {
        fontSize: 14,
        color: '#111827',
    },

    // Search Button
    searchButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 48,
        backgroundColor: '#EAB308',
        borderRadius: 16,
        gap: 8,
        // Shadow
        shadowColor: '#1E3A8A',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
    },
    searchButtonPressed: {
        transform: [{ scale: 0.98 }],
    },
    searchButtonText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#FFFFFF',
    },
});

export default MobileSearchInputbox;