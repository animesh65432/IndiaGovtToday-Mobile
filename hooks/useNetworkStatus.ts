import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

export function useNetworkStatus() {
    const [isOnline, setIsOnline] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
            const online =
                state.isConnected === true &&
                (state.isInternetReachable ?? true);
            setIsOnline(online);
        });

        return () => unsubscribe();
    }, []);

    return { isOnline };
}
