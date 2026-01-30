import { GeolocationResponse } from "@/types/geolocation";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Platform } from 'react-native';

export async function getUserIndiaLocation(): Promise<{
    state_ut: string;
    district: string;
    city: string;
    country: string;
    pincode: string;
} | null> {
    const CACHE_KEY = 'userIndiaLocation';
    const CACHE_DURATION = 30 * 24 * 60 * 60 * 1000;

    try {
        const cached = await AsyncStorage.getItem(CACHE_KEY);
        if (cached) {
            const { data, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_DURATION) {
                console.log(data, timestamp);
                return data;
            }
        }
    } catch (error) {
        console.warn('Cache read error:', error);
    }


    if (Platform.OS === 'ios') {
        try {
            await new Promise<void>((resolve, reject) => {
                Geolocation.requestAuthorization(resolve, reject);
            });
        } catch (error) {
            console.warn('iOS location permission denied');
            return null;
        }
    }
    // Android: Use PermissionsAndroid
    else if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message: 'This app needs access to your location to provide India-specific features.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                console.warn('Android location permission denied');
                return null;
            }
        } catch (error) {
            console.warn('Android permission request error:', error);
            return null;
        }
    }

    const position = await new Promise<GeolocationResponse>((resolve, reject) => {
        Geolocation.getCurrentPosition(
            (position: GeolocationResponse) => resolve(position),
            (error) => reject(error),
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 10000,
            }
        );
    });

    const { latitude: lat, longitude: lng } = position.coords;

    try {
        const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
        );
        const data = await response.json();

        const location = {
            state_ut: data.principalSubdivision || '',
            district: data.locality || '',
            city: data.city || data.locality || '',
            country: data.countryName || '',
            pincode: data.postcode || '',
        };

        const cacheData = {
            data: location,
            timestamp: Date.now(),
        };
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        return location;
    } catch (error) {
        console.error('Geocoding error:', error);
        return null;
    }
}
