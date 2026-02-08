import { LoaderCircle } from 'lucide-react-native';
import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

const SpinningLoader = ({ size = 20, color = "black" }) => {
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <LoaderCircle size={size} color={color} />
        </Animated.View>
    );
};

export default SpinningLoader;