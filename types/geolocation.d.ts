export interface GeolocationResponse {
    coords: {
        latitude: number;
        longitude: number;
        accuracy: number;
        altitude?: number | null;
        altitudeAccuracy?: number | null;
        heading?: number | null;
        speed?: number | null;
    };
    timestamp: number;
}

export interface GeolocationError {
    code: number;
    message: string;
}

export function getCurrentPosition(
    success: (position: GeolocationResponse) => void,
    error?: (error: GeolocationError) => void,
    options?: {
        timeout?: number;
        maximumAge?: number;
        enableHighAccuracy?: boolean;
    }
): void;

export function requestAuthorization(
    success: () => void,
    error?: () => void
): void;

