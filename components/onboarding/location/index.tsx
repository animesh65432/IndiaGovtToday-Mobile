import { LocationContext } from "@/context/Location";
import { MapPin } from "lucide-react-native";
import React, { useContext, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
    onComplete: () => void;
}

const Location: React.FC<Props> = ({ onComplete }) => {
    const { fetchLocation } = useContext(LocationContext);
    const [isLoading, setIsLoading] = useState(false);

    const handleAllowLocation = async () => {
        try {
            setIsLoading(true);
            console.log("Fetching location...");
            await fetchLocation();
            console.log("Location fetched successfully");
            onComplete();
        } catch (error) {
            console.error("Error fetching location:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <View style={styles.iconContainer}>
                    <View style={styles.iconCircle}>
                        <MapPin size={60} color="#FBBF24" strokeWidth={2} />
                    </View>
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.title}>Enable Location</Text>
                    <Text style={styles.description}>
                        Allow your location to find out nearby announcements
                    </Text>
                </View>

                <TouchableOpacity
                    style={[styles.button, isLoading && styles.buttonDisabled]}
                    activeOpacity={0.8}
                    onPress={handleAllowLocation}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#1A1A1A" />
                    ) : (
                        <Text style={styles.buttonText}>Allow Location</Text>
                    )}
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.skipButton}
                    onPress={onComplete}
                    disabled={isLoading}
                >
                    <Text style={[styles.skipText, isLoading && styles.skipTextDisabled]}>
                        Skip for now
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    iconContainer: {
        marginBottom: 32,
    },
    iconCircle: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: '#FEF3C7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    title: {
        fontSize: 28,
        fontFamily: 'Poppins_700Bold',
        color: '#1A1A1A',
        marginBottom: 12,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        fontFamily: 'Poppins_400Regular',
        color: '#666666',
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 16,
    },
    button: {
        backgroundColor: '#FBBF24',
        paddingVertical: 16,
        paddingHorizontal: 48,
        borderRadius: 12,
        width: '100%',
        maxWidth: 320,
        shadowColor: '#FBBF24',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: '#1A1A1A',
        fontSize: 18,
        fontFamily: 'Poppins_600SemiBold',
        textAlign: 'center',
    },
    skipButton: {
        marginTop: 16,
        paddingVertical: 12,
    },
    skipText: {
        color: '#999999',
        fontSize: 16,
        fontFamily: 'Poppins_500Medium',
    },
    skipTextDisabled: {
        opacity: 0.4,
    },
});

export default Location;