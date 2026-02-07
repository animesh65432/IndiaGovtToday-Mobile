import { GoogleClientId } from "@/config/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React, { createContext, useEffect, useState } from "react";

export const User = createContext({
    name: "Guest",
    email: "",
    isLoggedIn: false,
    pofilepicture: "",
    SignOut: () => { },
    SignIn: () => { },
})

type Props = {
    children: React.ReactNode
}

GoogleSignin.configure({
    webClientId: GoogleClientId
});


export const UserProvider: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useState({
        name: "Guest",
        email: "",
        isLoggedIn: false,
        pofilepicture: "",
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

    useEffect(() => {
        GetUserProfileFromCache();
    }, [])

    const SignOut = async () => {
        try {
            await GoogleSignin.signOut();
            await AsyncStorage.removeItem("userProfile");
            setUser({
                name: "Guest",
                email: "",
                isLoggedIn: false,
                pofilepicture: "",
            });
        }
        catch (error) {
            console.error("Error signing out:", error);
        }
    }

    const SignIn = async () => {
        try {
            const signInResult = await GoogleSignin.signIn();
            const user = signInResult.data?.user;

            if (!user) return;

            setUser({
                name: user.name ?? "Guest",
                email: user.email ?? "",
                isLoggedIn: true,
                pofilepicture: user.photo ?? "",
            });
            await AsyncStorage.setItem("userProfile", JSON.stringify(user));
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
