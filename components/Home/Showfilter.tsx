import { lanContext } from '@/context/lan';
import { TranslateText } from '@/lib/translatetext';
import { X } from 'lucide-react-native';
import React, { useContext, useEffect } from 'react';
import {
    Dimensions,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated';
import SearchInputbox from "./SearchInputBox";

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

type Props = {
    ShowFilterCard: boolean;
    SetFilterShowCard: (val: boolean) => void;
    StatesSelected: string[];
    SetStatesSelected: React.Dispatch<React.SetStateAction<string[]>>;
    DeparmentsSelected: string;
    SetDeparmentsSelected: React.Dispatch<React.SetStateAction<string>>;
    SearchInput: string;
    SetSearchInput: React.Dispatch<React.SetStateAction<string>>;
    onSearch: () => void;
};

const ShowFilter: React.FC<Props> = ({
    ShowFilterCard,
    SetFilterShowCard,
    StatesSelected,
    SetStatesSelected,
    DeparmentsSelected,
    SetDeparmentsSelected,
    SearchInput,
    SetSearchInput,
    onSearch,
}) => {
    const { lan } = useContext(lanContext);

    const backdropOpacity = useSharedValue(0);
    const translateY = useSharedValue(SCREEN_HEIGHT);

    useEffect(() => {
        if (ShowFilterCard) {
            backdropOpacity.value = withTiming(1, { duration: 300 });
            translateY.value = withSpring(0, {
                damping: 25,
                stiffness: 200,
            });
        } else {
            backdropOpacity.value = withTiming(0, { duration: 300 });
            translateY.value = withTiming(SCREEN_HEIGHT, { duration: 300 });
        }
    }, [ShowFilterCard]);

    const onClose = () => {
        SetFilterShowCard(false);
    };

    const backdropStyle = useAnimatedStyle(() => ({
        opacity: backdropOpacity.value,
    }));

    const modalStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));


    return (
        <Modal
            visible={ShowFilterCard}
            transparent={true}
            animationType="none"
            statusBarTranslucent
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                <Pressable style={styles.backdropPressable} onPress={onClose}>
                    <Animated.View style={[styles.backdrop, backdropStyle]} />
                </Pressable>

                <Animated.View style={[styles.modalContent, modalStyle]}>
                    {/* Drag Indicator */}
                    <View style={styles.dragIndicator} />

                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.title}>
                            {TranslateText[lan].FILTER_ANNOUNCEMENTS}
                        </Text>
                        <Pressable
                            onPress={onClose}
                            style={({ pressed }) => [
                                styles.closeButton,
                                pressed && styles.closeButtonPressed,
                            ]}
                        >
                            <X size={20} color="#6B7280" />
                        </Pressable>
                    </View>

                    <View
                        style={styles.scrollView}
                    >
                        <SearchInputbox
                            StatesSelected={StatesSelected}
                            SetStatesSelected={SetStatesSelected}
                            DeparmentsSelected={DeparmentsSelected}
                            SetDeparmentsSelected={SetDeparmentsSelected}
                            onSearch={() => {
                                onSearch();
                                onClose();
                            }}
                        />
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    backdropPressable: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 100,
    },
    backdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalContent: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        backgroundColor: '#FFFFFF',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 24,
        paddingBottom: 24,
        paddingTop: 16,
        maxHeight: SCREEN_HEIGHT * 0.95,
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 16,
        // Elevation for Android
        elevation: 20,
    },
    dragIndicator: {
        width: 48,
        height: 6,
        backgroundColor: '#E5E7EB',
        borderRadius: 3,
        alignSelf: 'center',
        marginBottom: 24,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
        paddingHorizontal: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: '#111827',
        letterSpacing: -0.5,
        fontFamily: "Poppins_600SemiBold"
    },
    closeButton: {
        padding: 8,
        backgroundColor: '#F3F4F6',
        borderRadius: 999,
    },
    closeButtonPressed: {
        transform: [{ scale: 0.9 }],
    },
    scrollView: {
        flex: 1,
    },
    Content: {
        paddingHorizontal: 8,
        paddingBottom: 40,
        flexGrow: 1,
    },
});

export default ShowFilter;