import { GetallSaves } from "@/api/save";
import Annoucements from "@/components/Home/Annoucements";
import { AnnouncementContext } from "@/context/Annoucment";
import { lanContext } from "@/context/lan";
import { User as UserContext } from "@/context/user";
import { AnnouncementType, AnnouncementsResponse } from "@/types";
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Save = () => {
    const { token } = useContext(UserContext)
    const { DoesItadd } = useContext(AnnouncementContext)
    const { lan } = useContext(lanContext)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showAuthCard, setShowAuthCard] = useState(false);
    const [IsLoadingMore, SetIsLoadingMore] = useState<boolean>(false)
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(10);
    const [IsRemoved, SetIsRemoved] = useState(false)
    const [announcements, setAnnouncements] = useState<AnnouncementType[]>([])

    const fetchSavedAnnouncements = async (append = false, page = 1, limit = 10, lan: string) => {
        if (append) {
            SetIsLoadingMore(true)
        } else {
            setIsLoading(true);
        }

        try {
            if (!token || token === "null" || token.length === 0) {
                console.warn("No token available. Cannot fetch saved announcements.");
                return;
            }

            const response = await GetallSaves(token, lan, page, limit) as AnnouncementsResponse;

            if (append) {
                setAnnouncements(prev => [...prev, ...response.data]);
            }
            else {
                setAnnouncements(response.data);
            }

            setTotalPages(response.pagination.totalPages);

        } catch (error) {
            console.error('Error fetching saved announcements:', error);
        }
        finally {
            setIsLoading(false);
            SetIsLoadingMore(false);
        }
    }

    useEffect(() => {
        if (page !== 1) {
            fetchSavedAnnouncements(true, page, 10, lan);
        }
    }, [page])

    const OnLoadMoredata = () => {
        if (page < totalPages) {
            setPage(prevPage => prevPage + 1);
        }
    }

    useEffect(() => {
        fetchSavedAnnouncements(false, page, totalPages, lan);
    }, [token, IsRemoved, DoesItadd, lan])

    return (
        <View style={styles.container}>
            <View style={styles.Header}>
                <Text style={styles.HeaderText}>Saved Announcements</Text>
            </View>
            <Annoucements
                IsLoading={isLoading}
                Annoucements={announcements}
                OnLoadMoredata={OnLoadMoredata}
                page={page}
                totalPages={totalPages}
                IsLoadingMore={IsLoadingMore}
                showAuthCard={showAuthCard}
                setShowAuthCard={setShowAuthCard}
                IsSavedbuttonShown={false}
                IsRemoved={IsRemoved}
                SetIsRemoved={SetIsRemoved}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        gap: 30
    },
    Header: {
        width: "90%",
        marginTop: 40,
        alignSelf: 'center',
    },
    HeaderText: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 22,
    }

})

export default Save