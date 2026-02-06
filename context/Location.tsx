import { getUserIndiaLocation } from '@/hooks/getUserIndiaLocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import { Toast } from 'toastify-react-native';

export const LocationContext = createContext<{
    state_ut: string;
    district: string;
    city: string;
    country: string;
    pincode: string;
    isLoading: boolean;
    hasPermission: boolean | null;
    fetchLocation: () => Promise<void>;
}>({
    state_ut: '',
    district: '',
    city: '',
    country: '',
    pincode: '',
    isLoading: false,
    hasPermission: null,
    fetchLocation: async () => { },
});

type LocationProviderProps = {
    children: React.ReactNode;
}

const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
    const [location, setLocation] = useState<{
        state_ut: string;
        district: string;
        city: string;
        country: string;
        pincode: string;
    }>({
        state_ut: '',
        district: '',
        city: '',
        country: '',
        pincode: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);


    useEffect(() => {
        loadCachedLocation();
    }, []);

    const loadCachedLocation = async () => {
        try {
            const cached = await AsyncStorage.getItem('userIndiaLocation');
            if (cached) {
                const { data } = JSON.parse(cached);
                setLocation(data);
            }
        } catch (error) {
            console.warn('Failed to load cached location:', error);
        }
    };

    const fetchLocation = async () => {
        setIsLoading(true);
        try {
            const loc = await getUserIndiaLocation();
            if (loc) {
                setLocation(loc);
                setHasPermission(true);
            } else {
                setHasPermission(false);
                Toast.error("Unable to fetch location. Please check your permissions.");
            }
        } catch (error) {
            console.error("Error fetching location:", error);
            setHasPermission(false);
            Toast.error("Unable to fetch location. Please allow location permissions and try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <LocationContext.Provider value={{
            ...location,
            isLoading,
            hasPermission,
            fetchLocation,
        }}>
            {children}
        </LocationContext.Provider>
    )
}

export default LocationProvider;