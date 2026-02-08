import { singinwithgoogle } from "@/api/user";
import { GoogleClientId } from "@/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import React, { createContext, useEffect, useState } from "react";
import { Toast } from "toastify-react-native";

WebBrowser.maybeCompleteAuthSession();

export const User = createContext({
    name: "Guest",
    email: "",
    isLoggedIn: false,
    pofilepicture: "",
    token: "",
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

    const [request, response, promptAsync] = Google.useAuthRequest(
        {
            clientId: GoogleClientId,
            redirectUri: 'https://auth.expo.io/@animesh2002/IndiaGovtToday',
        }
    );

    const GetUserProfileFromCache = async () => {
        try {
            const cachedUser = await AsyncStorage.getItem("userProfile");
            if (cachedUser) {
                setUser(JSON.parse(cachedUser));
            }
        }
        catch (error) {
            console.error("Error fetching user profile from cache:", error);
        }
    }

    const fetchUserInfo = async (accessToken: string) => {
        try {
            const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            const userInfo = await response.json();

            const userProfile: UserProfile = {
                name: userInfo.name ?? "Guest",
                email: userInfo.email ?? "",
                isLoggedIn: true,
                pofilepicture: userInfo.picture ?? "",
                token: ""
            };

            const authresponse = await singinwithgoogle(
                userProfile.name,
                userProfile.email
            ) as {
                token: string;
                message: string;
            };

            await AsyncStorage.setItem("userProfile", JSON.stringify(
                { ...userProfile, token: authresponse.token }
            ));

            setUser({ ...userProfile, token: authresponse.token });

            Toast.success(authresponse.message);
        } catch (error) {
            console.error("Error fetching user info:", error);
            Toast.error("Failed to get user info");
        }
    };

    useEffect(() => {
        GetUserProfileFromCache();
    }, [])

    useEffect(() => {
        console.log('🔍 Response type:', response?.type);
        console.log('🔍 Response:', response);

        if (response?.type === 'success') {
            const { authentication } = response;
            if (authentication?.accessToken) {
                console.log('✅ Got access token!');
                fetchUserInfo(authentication.accessToken);
            }
        } else if (response?.type === 'error') {
            console.error('❌ Auth error:', response.error);
            Toast.error('Sign in failed: ' + response.error?.message);
        } else if (response?.type === 'cancel') {
            console.log('⚠️ Sign in cancelled');
            Toast.info('Sign in cancelled');
        }
    }, [response]);

    const SignOut = async () => {
        try {
            await AsyncStorage.removeItem("userProfile");
            setUser({
                name: "Guest",
                email: "",
                isLoggedIn: false,
                pofilepicture: "",
                token: "",
            });
            Toast.success('Signed out successfully');
        }
        catch (error) {
            console.error("Error signing out:", error);
        }
    }

    const SignIn = async () => {
        try {
            console.log('🚀 Starting Google Sign In...');
            const result = await promptAsync();
            console.log('📥 Prompt result:', result);
        }
        catch (error) {
            console.error("Error signing in:", error);
            Toast.error("Sign in failed");
        }
    }

    return <User.Provider value={{
        ...user,
        SignOut,
        SignIn,
    }}>
        {children}
    </User.Provider>
}