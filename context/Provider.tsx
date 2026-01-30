import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useCallback, useEffect } from 'react';
import { lanContext } from "./lan";

type Props = {
    children: React.ReactNode;
};

const Provider: React.FC<Props> = ({ children }) => {
    const [lan, setLan] = React.useState<string>("English");

    useEffect(() => {
        AsyncStorage.getItem('language')
            .then(storedLan => {
                if (storedLan) {
                    setLan(storedLan);
                }
            })
            .catch(err => console.warn('Failed to load language:', err));
    }, []);


    const handleSetLan = useCallback(async (newLan: string) => {
        setLan(newLan);
        try {
            await AsyncStorage.setItem('language', newLan);
        } catch (err) {
            console.warn('Failed to save language:', err);
        }
    }, []);

    return (
        <lanContext.Provider value={{ lan, setLan: handleSetLan }}>
            {children}
        </lanContext.Provider>
    );
};

export default Provider;
