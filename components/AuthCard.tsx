import { lanContext } from "@/context/lan";
import { User } from "@/context/user";
import { TranslateText } from "@/lib/translatetext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useContext } from 'react';
import { ActivityIndicator, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
    showAuthCard: boolean;
    setShowAuthCard: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthCard: React.FC<Props> = ({ showAuthCard, setShowAuthCard }) => {
    const { SignIn, IsLoading } = useContext(User);
    const { lan } = useContext(lanContext)

    const handleSignIn = async () => {
        try {
            await SignIn();
        }
        finally {
            setShowAuthCard(false);
        }
    }

    return (
        <Modal
            visible={showAuthCard}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setShowAuthCard(false)}
        >
            <View style={styles.overlay}>
                <View style={styles.card}>
                    <Text style={styles.title}>{TranslateText[lan].SIGN_IN_REQUIRED}</Text>
                    <Text style={styles.message}>
                        {TranslateText[lan].TO_SAVE_ANNOUNCEMENTS_YOU_NEED_TO_SIGN_IN_FIRST}
                    </Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.googleButtonOfficial}
                            onPress={handleSignIn}
                            disabled={IsLoading}
                        >
                            {IsLoading ? (
                                <ActivityIndicator color="#1a1a1a" />
                            ) : (
                                <>
                                    <View style={styles.googleLogoContainer}>
                                        <MaterialCommunityIcons
                                            name="google"
                                            size={20}
                                            color="#3c4043"
                                        />
                                    </View>
                                    <Text style={styles.googleButtonTextOfficial}>
                                        {TranslateText[lan].SIGN_IN}
                                    </Text>
                                </>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setShowAuthCard(false)}
                        >
                            <Text style={styles.cancelText}>{TranslateText[lan].CANCEL}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 24,
        width: '100%',
        maxWidth: 400,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 24,
        color: '#1a1a1a',
        marginBottom: 12,
        textAlign: 'center',
    },
    message: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 24,
    },
    buttonContainer: {
        gap: 12,
    },
    signInButton: {
        backgroundColor: '#FFD700',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: 'center',
    },
    signInText: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 16,
        color: '#1a1a1a',
    },
    cancelButton: {
        backgroundColor: 'transparent',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    cancelText: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 16,
        color: '#666666',
    },
    googleButtonOfficial: {
        backgroundColor: '#FFD700',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#dadce0',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 1,
        elevation: 2,
    },
    googleLogoContainer: {
        width: 24,
        height: 24,
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    googleButtonTextOfficial: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 14,
        color: '#3c4043',
    },
});

export default AuthCard;