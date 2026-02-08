import { singinwithgoogle } from "@/api/user";
import { GoogleClientId } from "@/config/index";
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

    const [request, response, promptAsync] = Google.useAuthRequest({
        webClientId: GoogleClientId,
        androidClientId: GoogleClientId,
        iosClientId: GoogleClientId,
    });

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

            const authresponse = await singinwithgoogle(userProfile.name, userProfile.email) as {
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
        }
    };

    useEffect(() => {
        GetUserProfileFromCache();
    }, [])


    useEffect(() => {
        if (response?.type === 'success') {
            const { authentication } = response;
            if (authentication?.accessToken) {
                fetchUserInfo(authentication.accessToken);
            }
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
        }
        catch (error) {
            console.error("Error signing out:", error);
        }
    }

    const SignIn = async () => {
        try {
            await promptAsync();
        }
        catch (error) {
            console.error("Error signing in:", error);
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