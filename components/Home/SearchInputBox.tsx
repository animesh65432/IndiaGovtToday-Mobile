import { GetallAnnoucementsDepartments } from '@/api/announcements';
import { Currentdate } from '@/context/Currentdate';
import { lanContext } from '@/context/lan';
import { TranslateText } from '@/lib/translatetext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Building2, Calendar as CalendarIcon, ChevronDown, ChevronRight, MapPin, Search } from 'lucide-react-native';
import React, { useContext, useEffect, useState } from 'react';
import {
    FlatList,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

interface RegionOption {
    label: string;
    value: string;
}

type SearchInputboxProps = {
    StatesSelected: string[];
    SetStatesSelected: React.Dispatch<React.SetStateAction<string[]>>;
    DeparmentsSelected: string;
    SetDeparmentsSelected: React.Dispatch<React.SetStateAction<string>>;
    SearchInput: string;
    SetSearchInput: React.Dispatch<React.SetStateAction<string>>;
    onSearch: () => void;
};

const SearchInputbox: React.FC<SearchInputboxProps> = ({
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

    const toggleAllRegions = () => {
        const allRegionValues = TranslateText[lan].MULTISELECT_OPTIONS.map((item: RegionOption) => item.value);
        if (StatesSelected.length === allRegionValues.length) {
            // If all selected, deselect all
            SetStatesSelected([]);
        } else {
            // Select all
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
            return 'Select Regions';
        }
        const totalRegions = TranslateText[lan].MULTISELECT_OPTIONS.length;
        if (StatesSelected.length === totalRegions) {
            return 'All Regions';
        }
        return `${StatesSelected.length} region${StatesSelected.length > 1 ? 's' : ''} selected`;
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
                <View
                    style={[
                        styles.checkbox,
                        isSelected && styles.checkboxChecked,
                    ]}
                >
                    {isSelected && (
                        <Text style={styles.checkmark}>✓</Text>
                    )}
                </View>
                <Text style={[
                    styles.dropdownOptionText,
                    isSelected && styles.dropdownOptionTextSelected,
                ]}>
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
                    <View
                        style={[
                            styles.checkbox,
                            isSelected && styles.checkboxChecked,
                        ]}
                    >
                        {isSelected && (
                            <Text style={styles.checkmark}>✓</Text>
                        )}
                    </View>
                    <Text style={[
                        styles.dropdownOptionText,
                        isSelected && styles.dropdownOptionTextSelected,
                    ]}>
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
                <View
                    style={[
                        styles.checkbox,
                        isSelected && styles.checkboxChecked,
                    ]}
                >
                    {isSelected && (
                        <Text style={styles.checkmark}>✓</Text>
                    )}
                </View>
                <Text style={[
                    styles.dropdownOptionText,
                    isSelected && styles.dropdownOptionTextSelected,
                ]}>
                    {dept}
                </Text>
            </TouchableOpacity>
        );
    };

    const isAllRegionsSelected = StatesSelected.length === TranslateText[lan].MULTISELECT_OPTIONS.length;

    return (
        <View style={styles.container}>
            {/* Keyword Search */}
            <View style={styles.section}>
                <Text style={styles.label}>{TranslateText[lan].KEYWORDS}</Text>
                <View style={styles.searchInputContainer}>
                    <Search size={18} color="#9CA3AF" style={styles.searchIcon} />
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
                        <MapPin size={18} color={showRegionPicker ? '#3B82F6' : '#9CA3AF'} style={styles.selectButtonIcon} />
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
                        size={18}
                        color={showRegionPicker ? '#3B82F6' : '#9CA3AF'}
                        style={[
                            styles.chevron,
                            showRegionPicker && styles.chevronRotated,
                        ]}
                    />
                </Pressable>

                {showRegionPicker && (
                    <View style={styles.dropdownContainer}>
                        <View style={styles.dropdown}>
                            <View style={styles.dropdownHeader}>
                                <Text style={styles.dropdownHeaderText}>
                                    {StatesSelected.length === 0
                                        ? 'Select regions'
                                        : isAllRegionsSelected
                                            ? 'All regions selected'
                                            : `${StatesSelected.length} selected`}
                                </Text>
                                <Pressable onPress={closeAllDropdowns}>
                                    <Text style={styles.doneButton}>Done</Text>
                                </Pressable>
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
                                <View
                                    style={[
                                        styles.checkbox,
                                        isAllRegionsSelected && styles.checkboxChecked,
                                    ]}
                                >
                                    {isAllRegionsSelected && (
                                        <Text style={styles.checkmark}>✓</Text>
                                    )}
                                </View>
                                <Text style={[
                                    styles.dropdownOptionText,
                                    styles.allRegionsText,
                                    isAllRegionsSelected && styles.dropdownOptionTextSelected,
                                ]}>
                                    All Regions
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
                        <Building2 size={18} color={showDepartmentPicker ? '#3B82F6' : '#9CA3AF'} style={styles.selectButtonIcon} />
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
                        size={18}
                        color={showDepartmentPicker ? '#3B82F6' : '#9CA3AF'}
                        style={[
                            styles.chevron,
                            showDepartmentPicker && styles.chevronRotated,
                        ]}
                    />
                </Pressable>

                {showDepartmentPicker && (
                    <View style={styles.dropdownContainer}>
                        <View style={styles.dropdown}>
                            <View style={styles.dropdownHeader}>
                                <Text style={styles.dropdownHeaderText}>
                                    Select department
                                </Text>
                                <Pressable onPress={closeAllDropdowns}>
                                    <Text style={styles.doneButton}>Done</Text>
                                </Pressable>
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
                        <CalendarIcon size={16} color="#9CA3AF" style={styles.calendarIcon} />
                        <Text style={styles.dateButtonText}>
                            {startdate ? startdate.toLocaleDateString() : 'From'}
                        </Text>
                    </Pressable>

                    <Pressable
                        style={({ pressed }) => [
                            styles.dateButton,
                            pressed && styles.dateButtonPressed,
                        ]}
                        onPress={() => setShowEndDatePicker(true)}
                    >
                        <CalendarIcon size={16} color="#9CA3AF" style={styles.calendarIcon} />
                        <Text style={styles.dateButtonText}>
                            {endDate ? endDate.toLocaleDateString() : 'To'}
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
                <ChevronRight size={20} color="#FFFFFF" />
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
        color: '#9CA3AF',
        letterSpacing: 1.5,
        marginLeft: 4,
    },
    searchInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 56,
        backgroundColor: '#F9FAFB',
        borderRadius: 16,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#F3F4F6',
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#111827',
    },
    selectButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: 56,
        backgroundColor: '#F9FAFB',
        borderRadius: 16,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    selectButtonPressed: {
        backgroundColor: '#F3F4F6',
    },
    selectButtonActive: {
        borderColor: '#3B82F6',
        backgroundColor: '#EFF6FF',
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
        color: '#111827',
    },
    selectButtonTextActive: {
        color: '#3B82F6',
    },
    selectButtonPlaceholder: {
        color: '#9CA3AF',
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
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        height: 280,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },
    dropdownHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
        backgroundColor: '#FAFBFC',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    dropdownHeaderText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#6B7280',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    doneButton: {
        fontSize: 14,
        fontWeight: '600',
        color: '#3B82F6',
    },
    allRegionsOption: {
        borderBottomWidth: 1,
        borderBottomColor: '#F3F4F6',
        marginBottom: 4,
        paddingBottom: 16,
    },
    allRegionsText: {
        fontWeight: '700',
    },
    separator: {
        height: 1,
        backgroundColor: '#E5E7EB',
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
        backgroundColor: '#EFF6FF',
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: '#D1D5DB',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    checkboxChecked: {
        backgroundColor: '#3B82F6',
        borderColor: '#3B82F6',
    },
    checkmark: {
        color: '#FFFFFF',
        fontSize: 13,
        fontWeight: '700',
    },
    dropdownOptionText: {
        flex: 1,
        fontSize: 15,
        fontWeight: '500',
        color: '#374151',
    },
    dropdownOptionTextSelected: {
        color: '#1E40AF',
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
        backgroundColor: '#F9FAFB',
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        paddingHorizontal: 16,
    },
    dateButtonPressed: {
        backgroundColor: '#F3F4F6',
    },
    calendarIcon: {
        marginRight: 8,
    },
    dateButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#111827',
    },
    searchButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 56,
        backgroundColor: '#EAB308',
        borderRadius: 16,
        gap: 8,
        shadowColor: '#EAB308',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 12,
        elevation: 6,
    },
    searchButtonPressed: {
        transform: [{ scale: 0.98 }],
        opacity: 0.9,
    },
    searchButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#FFFFFF',
        letterSpacing: 0.5,
    },
});

export default SearchInputbox;