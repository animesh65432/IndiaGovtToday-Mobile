import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

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

    // Request location permissions (works for both iOS and Android)
    try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.warn('Location permission denied');
            return null;
        }
    } catch (error) {
        console.warn('Permission request error:', error);
        return null;
    }

    // Get current position
    try {
        const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High,
        });

        const { latitude: lat, longitude: lng } = location.coords;

        // Fetch reverse geocoding data
        const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
        );
        const data = await response.json();

        const locationData = {
            state_ut: data.principalSubdivision || '',
            district: data.locality || '',
            city: data.city || data.locality || '',
            country: data.countryName || '',
            pincode: data.postcode || '',
        };

        // Cache the result
        const cacheData = {
            data: locationData,
            timestamp: Date.now(),
        };
        await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
        return locationData;
    } catch (error) {
        console.error('Location or geocoding error:', error);
        return null;
    }
}