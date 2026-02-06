import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import Languages from "./Languages";
import Location from "./location";
import Welcome from "./welcome";

interface OnboardingScreenProps {
    setHasOnboarded: (hasOnboarded: boolean) => void;
}

const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ setHasOnboarded }) => {
    const [pageIndex, setPageIndex] = React.useState(0);
    const onboardingRef = React.useRef<Onboarding>(null);

    const handlePageChange = (index: number) => {
        setPageIndex(index);
        onboardingRef.current?.goToPage(index, true);
    };

    const handleComplete = () => {
        setHasOnboarded(true);
    };

    return (
        <Onboarding
            ref={onboardingRef}
            pages={[
                {
                    backgroundColor: "#fff",
                    image: <></>,
                    title: <Welcome handlePageChange={handlePageChange} />,
                    subtitle: "",
                },
                {
                    backgroundColor: "#fff",
                    image: <></>,
                    title: <Languages handlePageChange={handlePageChange} />,
                    subtitle: "",
                },
                {
                    backgroundColor: "#fff",
                    image: <></>,
                    title: <Location onComplete={handleComplete} />,
                    subtitle: "",
                }
            ]}
            showPagination={false}
            showSkip={false}
            showNext={false}
            showDone={false}
            bottomBarHeight={0}
            bottomBarColor="transparent"
            containerStyles={{ padding: 0, margin: 0 }}
            pageIndexCallback={handlePageChange}
        />
    );
};

export default OnboardingScreen;