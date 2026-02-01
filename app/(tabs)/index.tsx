import { getAllAnnouncements } from "@/api/announcements";
import Header from "@/components/Header";
import Annoucements from "@/components/Home/Annoucements";
import HeadingAndTitle from "@/components/Home/HeadingAndTitle";
import InputToggole from "@/components/Home/InputToggole";
import ShowFilter from "@/components/Home/Showfilter";
import { Currentdate } from "@/context/Currentdate";
import { lanContext } from "@/context/lan";
import { LocationContext } from "@/context/Location";
import { useStateCode } from "@/hooks/useStateCode";
import { TranslateText } from "@/lib/translatetext";
import { AnnouncementType, AnnouncementsResponse } from "@/types";
import { useContext, useEffect, useState } from "react";
import { ImageBackground, StyleSheet } from 'react-native';
import { Toast } from 'toastify-react-native';

export default function HomeScreen() {

  const [visible, setVisible] = useState(false);
  const [StatesSelected, SetStatesSelected] = useState<string[]>([]);
  const [DeparmentsSelected, SetDeparmentsSelected] = useState<string>("")
  const [SearchInput, SetSearchInput] = useState<string>("");

  const [totalPages, settotalPages] = useState<number>(0)
  const [IsLoading, SetIsLoading] = useState<boolean>(false)
  const [IsLoadingMore, SetIsLoadingMore] = useState<boolean>(false)
  const [Announcements, SetAnnouncements] = useState<AnnouncementType[]>([])
  const [page, Setpage] = useState<number>(1)
  const [limit] = useState<number>(10)

  const { startdate, endDate } = useContext(Currentdate)
  const { lan } = useContext(lanContext)
  const { state_ut } = useContext(LocationContext)

  const [trigger, setTrigger] = useState(0);

  const [DefaultsStatesApplied, SetDefaultsStatesApplied] = useState<string[]>([])

  const userStateCode = useStateCode(state_ut, lan);

  const fetchGetIndiaAnnouncements = async (
    pageNumber: number,
    append: boolean,
    signal: AbortSignal
  ) => {

    if (append) SetIsLoadingMore(true);
    else SetIsLoading(true);

    if (StatesSelected.length === 0) {
      SetIsLoading(false);
      return;
    }

    try {
      const response = await getAllAnnouncements(
        lan, startdate, endDate, pageNumber, limit,
        StatesSelected, DeparmentsSelected, SearchInput, signal
      ) as AnnouncementsResponse;

      if (!signal.aborted) {
        settotalPages(response.pagination.totalPages);
        SetAnnouncements(prev => append ? [...prev, ...response.data] : response.data);
      }
    } catch (error: unknown) {
      if (error instanceof Error &&
        (error.name === 'AbortError' || (error as { code?: string }).code === 'ERR_CANCELED')) {
        return;
      }
    } finally {
      if (!signal.aborted) {
        SetIsLoading(false);
        SetIsLoadingMore(false);
      }
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    Setpage(1);
    fetchGetIndiaAnnouncements(1, false, controller.signal);
    return () => controller.abort();
  }, [lan, state_ut, trigger, DefaultsStatesApplied]);

  useEffect(() => {
    if (state_ut) {
      const INDIA_GOVT_CODE = TranslateText[lan]["MULTISELECT_OPTIONS"][TranslateText[lan]["MULTISELECT_OPTIONS"].length - 1].value;
      SetStatesSelected([INDIA_GOVT_CODE, userStateCode]);
      SetDefaultsStatesApplied([INDIA_GOVT_CODE, userStateCode]);
    }
    else {
      const INDIA_GOVT_CODE = TranslateText[lan]["MULTISELECT_OPTIONS"][TranslateText[lan]["MULTISELECT_OPTIONS"].length - 1].value;
      SetStatesSelected([INDIA_GOVT_CODE]);
      SetDefaultsStatesApplied([INDIA_GOVT_CODE]);
    }
  }, [state_ut, lan]);

  useEffect(() => {
    if (page > 1) {
      const controller = new AbortController();
      fetchGetIndiaAnnouncements(page, true, controller.signal);
      return () => controller.abort();
    }
  }, [page]);

  const handleSearch = () => {
    if (StatesSelected.length === 0) {
      Toast.error(`${TranslateText[lan].NO_STATE_SELECTED}`);
    }
    else {
      Setpage(1);
      setTrigger(prev => prev + 1);
    }
  };

  const OnLoadMoredata = () => {
    if (page < totalPages) {
      Setpage(prev => prev + 1);
    }
  }

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
      <Annoucements
        Annoucements={Announcements}
        IsLoading={IsLoading}
        OnLoadMoredata={OnLoadMoredata}
        page={page}
        totalPages={totalPages}
      />
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