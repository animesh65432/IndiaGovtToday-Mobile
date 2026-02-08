import { lanContext } from "@/context/lan"
import { User as userContext } from "@/context/user"
import { Globe, LogOut, User2 } from "lucide-react-native"
import React, { useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Dropdown } from "react-native-element-dropdown"

const User = () => {
    const { name, email, isLoggedIn, SignOut } = useContext(userContext)
    const { lan, setLan } = useContext(lanContext)

    const languageData = Languages.map(lang => ({
        label: lang,
        value: lang
    }))

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.profileSection}>

                    <View style={styles.avatarPlaceholder}>
                        <User2 size={60} color="#1a1a1a" />
                    </View>


                    <View style={styles.userInfo}>
                        <Text style={styles.userName}>{name}</Text>
                        {email.length > 0 && (
                            <Text style={styles.userEmail}>{email}</Text>
                        )}
                    </View>
                </View>
            </View>

            {/* Settings Section */}
            <View style={styles.settingsContainer}>
                {/* Language Selection */}
                <View style={styles.settingCard}>
                    <View style={styles.settingHeader}>
                        <Globe size={24} color="#1a1a1a" />
                        <Text style={styles.settingTitle}>Language</Text>
                    </View>

                    <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.dropdownPlaceholder}
                        selectedTextStyle={styles.dropdownSelected}
                        itemTextStyle={styles.dropdownItem}
                        containerStyle={styles.dropdownContainer}
                        data={languageData}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select Language"
                        value={lan}
                        onChange={item => {
                            setLan(item.value)
                        }}
                    />
                </View>

                {/* Sign Out Button */}
                {isLoggedIn && (
                    <TouchableOpacity
                        style={styles.signOutButton}
                        onPress={SignOut}
                    >
                        <LogOut size={20} color="#1a1a1a" />
                        <Text style={styles.signOutText}>Sign Out</Text>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    header: {
        backgroundColor: '#FFD700',
        paddingTop: 60,
        paddingBottom: 40,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    profileSection: {
        alignItems: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 4,
        borderColor: '#FFFFFF',
    },
    avatarPlaceholder: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    userInfo: {
        alignItems: 'center',
        marginTop: 16,
    },
    userName: {
        fontFamily: 'Poppins_700Bold',
        fontSize: 24,
        color: '#1a1a1a',
        marginBottom: 4,
    },
    userEmail: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        color: '#333333',
    },
    settingsContainer: {
        padding: 20,
        gap: 16,
    },
    settingCard: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 20,
        borderWidth: 1,
        borderColor: '#f0f0f0',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.05,
        shadowRadius: 3.84,
        elevation: 2,
    },
    settingHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 12,
    },
    settingTitle: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 18,
        color: '#1a1a1a',
    },
    dropdown: {
        height: 50,
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        backgroundColor: '#f9f9f9',
    },
    dropdownPlaceholder: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        color: '#999999',
    },
    dropdownSelected: {
        fontFamily: 'Poppins_500Medium',
        fontSize: 14,
        color: '#1a1a1a',
    },
    dropdownItem: {
        fontFamily: 'Poppins_400Regular',
        fontSize: 14,
        color: '#1a1a1a',
    },
    dropdownContainer: {
        borderRadius: 12,
        borderColor: '#e0e0e0',
        marginTop: 8,
    },
    signOutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFD700',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        gap: 12,
        marginTop: 8,
    },
    signOutText: {
        fontFamily: 'Poppins_600SemiBold',
        fontSize: 16,
        color: '#1a1a1a',
    },
})

export const Languages: string[] = [
    "English",     // English
    "অসমীয়া",      // Assamese
    "বাংলা",        // Bengali
    "बरʼ",          // Bodo
    "डोगरी",        // Dogri
    "ગુજરાતી",      // Gujarati
    "हिन्दी",       // Hindi
    "ಕನ್ನಡ",        // Kannada
    "कॉशुर",        // Kashmiri
    "मैथिली",       // Maithili
    "മലയാളം",      // Malayalam
    "মৈতৈলোন",      // Manipuri (Meitei)
    "मराठी",        // Marathi
    "नेपाली",       // Nepali
    "ଓଡ଼ିଆ",        // Odia
    "ਪੰਜਾਬੀ",       // Punjabi
    "संस्कृतम्",    // Sanskrit
    "ᱥᱟᱱᱛᱟᱲᱤ",     // Santali (Ol Chiki)
    "سنڌي",         // Sindhi
    "தமிழ்",        // Tamil
    "తెలుగు",       // Telugu
    "اردو",        // Urdu,
];

export default User