import Header from "@/components/Header";
import Annoucements from "@/components/Home/Annoucements";
import HeadingAndTitle from "@/components/Home/HeadingAndTitle";
import InputToggole from "@/components/Home/InputToggole";
import ShowFilter from "@/components/Home/Showfilter";
import { useState } from "react";
import { ImageBackground, StyleSheet } from 'react-native';

export default function HomeScreen() {

  const [visible, setVisible] = useState(false);
  const [StatesSelected, SetStatesSelected] = useState<string[]>([]);
  const [DeparmentsSelected, SetDeparmentsSelected] = useState<string>("")
  const [SearchInput, SetSearchInput] = useState<string>("");


  return (
    <ImageBackground
      source={require('../../assets/images/bg.png')}
      style={styles.container}
    >
      <Header />
      <HeadingAndTitle />
      <InputToggole
        visible={visible}
        setVisible={setVisible}
      />
      {
        visible &&
        <ShowFilter
          ShowFilterCard={visible}
          SetFilterShowCard={setVisible}
          StatesSelected={StatesSelected}
          SetStatesSelected={SetStatesSelected}
          DeparmentsSelected={DeparmentsSelected}
          SetDeparmentsSelected={SetDeparmentsSelected}
          SearchInput={SearchInput}
          SetSearchInput={SetSearchInput}
          onSearch={() => { }}
        />
      }
      <Annoucements />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: 18,
    overflow: "hidden"
  }
})