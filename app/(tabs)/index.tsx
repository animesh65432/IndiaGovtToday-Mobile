import { getAllAnnouncements } from "@/api/announcements";
import AuthCard from "@/components/AuthCard";
import Annoucements from "@/components/Home/Annoucements";
import HeadingAndTitle from "@/components/Home/HeadingAndTitle";
import Input from "@/components/Home/Input";
import ShowFilter from "@/components/Home/Showfilter";
import { Currentdate } from "@/context/Currentdate";
import { lanContext } from "@/context/lan";
import { LocationContext } from "@/context/Location";
import { useStateCode } from "@/hooks/useStateCode";
import { TranslateText } from "@/lib/translatetext";
import { AnnouncementType, AnnouncementsResponse } from "@/types";
import { LinearGradient } from 'expo-linear-gradient';
import { FunnelPlus } from "lucide-react-native";
import { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from 'react-native';
import { Toast } from 'toastify-react-native';

export default function HomeScreen() {
  const [showAuthCard, setShowAuthCard] = useState(false);
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

    if (append) {
      SetIsLoadingMore(true)
    }
    else {
      SetIsLoading(true);
      SetAnnouncements([]);
    }

    if (StatesSelected.length === 0) {
      SetIsLoading(false);
      SetIsLoadingMore(false);
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
    if (SearchInput.trim().length < 2) return;

    const timer = setTimeout(() => {
      SetIsLoading(true);
      const controller = new AbortController();
      fetchGetIndiaAnnouncements(1, false, controller.signal);
    }, 500);

    return () => clearTimeout(timer);
  }, [SearchInput]);

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
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <LinearGradient
          colors={['rgba(251, 191, 36, 0.15)', 'transparent']}
          style={[styles.gradientPos, { top: 0, left: 0 }]}
        />
        <LinearGradient
          colors={['rgba(251, 191, 36, 0.08)', 'transparent']}
          style={[styles.gradientPos, { top: 0, right: 0 }]}
        />
      </View>
      <View
        style={styles.contentLayer}
      >
        <View style={{ gap: 10 }}>
          <HeadingAndTitle />
          <View style={styles.InputWrapper}>
            <Input
              SearchInput={SearchInput}
              SetSearchInput={SetSearchInput}
            />
            <FunnelPlus
              size={24}
              color="#4b5563"
              onPress={() => setVisible(true)}
              style={styles.FilterIcon}
            />
          </View>
        </View>
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
            onSearch={handleSearch}
          />
        }
        {showAuthCard
          &&
          <AuthCard
            showAuthCard={showAuthCard}
            setShowAuthCard={setShowAuthCard}
          />
        }
        <Annoucements
          Annoucements={Announcements}
          IsLoading={IsLoading}
          OnLoadMoredata={OnLoadMoredata}
          page={page}
          totalPages={totalPages}
          IsLoadingMore={IsLoadingMore}
          showAuthCard={showAuthCard}
          setShowAuthCard={setShowAuthCard}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F4',
  },
  gradientPos: {
    position: 'absolute',
    width: '100%',
    height: '40%',
  },
  contentLayer: {
    flex: 1,
    flexDirection: "column",
    gap: 18,
  },
  InputWrapper: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 0
  },
  FilterIcon: {
    marginRight: "auto"
  }
});