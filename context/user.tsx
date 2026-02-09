import { singinwithgoogle } from "@/api/user";
import { IOS_CLIENT_ID, WEB_CLIENT_ID } from "@/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    GoogleSignin,
    isErrorWithCode,
    isSuccessResponse,
    statusCodes
} from '@react-native-google-signin/google-signin';
import React, { createContext, useEffect, useState } from "react";
import { Toast } from "toastify-react-native";

GoogleSignin.configure({
    webClientId: WEB_CLIENT_ID,
    iosClientId: IOS_CLIENT_ID,
    offlineAccess: true,
});

export const User = createContext({
    name: "Guest",
    email: "",
    isLoggedIn: false,
    pofilepicture: "",
    token: "",
    IsLoading: false,
    SignOut: () => { },
    SignIn: () => { },
})

type Props = {
    children: React.ReactNode
}

type UserProfile = {
    name: string;
    email: string;
    isLoggedIn: boolean;
    pofilepicture: string;
    token: string;
}

export const UserProvider: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState<UserProfile>({
        name: "Guest",
        email: "",
        isLoggedIn: false,
        pofilepicture: "",
        token: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const GetUserProfileFromCache = async () => {
        try {
            const cachedUser = await AsyncStorage.getItem("userProfile");
            if (cachedUser) {
                setUser(JSON.parse(cachedUser));
            }
        } catch (error) {
            console.error("Error fetching user profile from cache:", error);
        }
    }

    useEffect(() => {
        GetUserProfileFromCache();
    }, []);

    const SignIn = async () => {
        setIsLoading(true);
        try {
            console.log('🚀 Starting Google Sign In...');

            // Check if play services are available
            await GoogleSignin.hasPlayServices();

            // Sign in
            const response = await GoogleSignin.signIn();

            if (isSuccessResponse(response)) {
                const { user } = response.data;

                console.log('✅ User Info:', user);

                // Create user profile
                const userProfile: UserProfile = {
                    name: user.name || "Guest",
                    email: user.email || "",
                    isLoggedIn: true,
                    pofilepicture: user.photo || "",
                    token: ""
                };

                // Send to your backend
                const authresponse = await singinwithgoogle(
                    userProfile.name,
                    userProfile.email
                ) as {
                    token: string;
                    message: string;
                };

                // Save to AsyncStorage
                const completeProfile = {
                    ...userProfile,
                    token: authresponse.token
                };

                await AsyncStorage.setItem("userProfile", JSON.stringify(completeProfile));


                setUser(completeProfile);

                Toast.success(authresponse.message || 'Signed in successfully');
            } else {
                Toast.info('Sign in cancelled');
            }

        } catch (error: any) {
            if (isErrorWithCode(error)) {
                switch (error.code) {
                    case statusCodes.SIGN_IN_CANCELLED:
                        console.log('User cancelled sign in');
                        Toast.info('Sign in cancelled');
                        break;

                    case statusCodes.IN_PROGRESS:
                        console.log('Sign in already in progress');
                        Toast.info('Sign in already in progress');
                        break;

                    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                        console.log('Play services not available');
                        Toast.error('Google Play Services not available');
                        break;
                    default:
                        console.log('Unknown error code:', error.code);
                        Toast.error('Sign in failed: ' + error.message);
                }
            } else {
                Toast.error('Sign in failed: ' + (error.message || 'Unknown error'));
            }
        } finally {
            setIsLoading(false);
        }
    }

    const SignOut = async () => {
        try {
            // Sign out from Google
            await GoogleSignin.signOut();

            // Clear AsyncStorage
            await AsyncStorage.removeItem("userProfile");

            // Reset state
            setUser({
                name: "Guest",
                email: "",
                isLoggedIn: false,
                pofilepicture: "",
                token: "",
            });

            Toast.success('Signed out successfully');
        } catch (error) {
            console.error("Error signing out:", error);
            Toast.error('Sign out failed');
        }
    }

    return (
        <User.Provider value={{
            ...user,
            IsLoading: isLoading,
            SignOut,
            SignIn,
        }}>
            {children}
        </User.Provider>
    )
}