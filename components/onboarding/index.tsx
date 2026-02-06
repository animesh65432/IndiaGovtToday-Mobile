import React from "react";
import { StyleSheet, View } from "react-native";
import Languages from "./Languages";
import Welcome from "./welcome";

const OnboardingScreen = () => {
    const [pageIndex, setPageIndex] = React.useState(0);

    const handlePageChange = (index: number) => {
        setPageIndex(index);
    }

    return (
        <View style={styles.container}>
            {pageIndex === 0 &&
                <Welcome handlePageChange={handlePageChange} />
            }
            {
                pageIndex === 1 &&
                <Languages handlePageChange={handlePageChange} />
            }

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    }
})



export default OnboardingScreen;