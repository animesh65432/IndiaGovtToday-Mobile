import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

type OnboardingContextType = {
    hasOnboarded: boolean;
    setHasOnboarded: (value: boolean) => void;
}

export const OnboardingContext = createContext<OnboardingContextType>({
    hasOnboarded: false,
    setHasOnboarded: (value: boolean) => { },
})

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [hasOnboarded, setHasOnboarded] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        AsyncStorage.getItem('onboarded')
            .then(value => {
                if (value === 'true') {
                    setHasOnboarded(false);
                } else {
                    setHasOnboarded(false);
                }
            })
            .finally(() => setIsLoading(false));
    }, []);

    const updateOnboarding = async (value: boolean) => {
        setHasOnboarded(value);
        await AsyncStorage.setItem('onboarded', value.toString());
    };

    if (isLoading) {
        return null;
    }

    return (
        <OnboardingContext.Provider value={{ hasOnboarded, setHasOnboarded: updateOnboarding }}>
            {children}
        </OnboardingContext.Provider>
    )
}