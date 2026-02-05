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

    useEffect(() => {
        AsyncStorage.getItem('onboarded')
            .then(value => {
                if (value === 'true') {
                    setHasOnboarded(false);
                } else {
                    setHasOnboarded(false);
                }
            });
    }, []);

    return (
        <OnboardingContext.Provider value={{ hasOnboarded, setHasOnboarded }}>
            {children}
        </OnboardingContext.Provider>
    )
}