import Header from "@/components/Header";
import HeadingAndTitle from "@/components/Home/HeadingAndTitle";
import { ImageBackground, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <ImageBackground
      source={require('../../assets/images/bg.png')}
      style={styles.container}
    >
      <Header />
      <HeadingAndTitle />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 15
  }
})