import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from "react-native-reanimated";

export const TextGenerateEffect = ({
    words,
    className,
    filter = true,
    duration = 1,
    textStyle,
}: {
    words: string;
    className?: string;
    filter?: boolean;
    duration?: number;
    textStyle?: any;
}) => {
    const wordsArray = words.split(" ");

    return (
        <View style={[styles.container, className as any]}>
            {wordsArray.map((word, idx) => (
                <AnimatedWord
                    key={`${word}-${idx}`}
                    word={word}
                    index={idx}
                    filter={filter}
                    duration={duration}
                    textStyle={textStyle}
                    isLast={idx === wordsArray.length - 1}
                />
            ))}
        </View>
    );
};

const AnimatedWord = ({
    word,
    index,
    filter,
    duration,
    textStyle,
    isLast,
}: {
    word: string;
    index: number;
    filter: boolean;
    duration: number;
    textStyle?: any;
    isLast: boolean;
}) => {
    const opacity = useSharedValue(0);

    useEffect(() => {
        // Stagger animation with 0.2s delay between words
        opacity.value = withDelay(
            index * 200, // 0.2s = 200ms
            withTiming(1, {
                duration: duration * 1000, // Convert to milliseconds
                easing: Easing.out(Easing.ease),
            })
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    });

    return (
        <Animated.Text style={[styles.word, textStyle, animatedStyle]}>
            {word}
            {!isLast && " "}
        </Animated.Text>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    word: {
        color: "#000",
        fontSize: 16,
    },
});