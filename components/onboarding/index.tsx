import { StyleSheet } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import Languages from "./Languages";
import Welcome from "./welcome";

const OnboardingScreen = () => {
    return (
        <Onboarding
            pages={[
                {
                    backgroundColor: "transparent",
                    image: <Welcome />,
                    title: "",
                    subtitle: "",
                },
                {
                    backgroundColor: "transparent",
                    image: <Languages />,
                    title: "",
                    subtitle: "",
                }
            ]}
            showSkip={true}
            showNext={true}
            showDone={true}
            skipLabel="Skip"
            nextLabel="Next"
            bottomBarHeight={60}
            containerStyles={{
                paddingHorizontal: 0,
            }}
            imageContainerStyles={{
                paddingBottom: 0,
            }}
            SkipButtonComponent={() => null}
            NextButtonComponent={() => null}
        />
    );
};

const styles = StyleSheet.create({
    NextButtom: {
        fontFamily: "Poppins_500Medium",
        padding: 40
    }
})

export default OnboardingScreen;