import { lanContext } from '@/context/lan';
import { TranslateText } from '@/lib/translatetext';
import { AnnouncementType } from '@/types';
import React, { useContext } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Annoucment from './Annoucment';
import AnnouncementSkeleton from './AnnouncementSkeleton';


type Props = {
    Annoucements: AnnouncementType[];
    OnLoadMoredata: () => void;
    IsLoading: boolean;
    page: number;
    totalPages: number;
    IsLoadingMore: boolean
    showAuthCard: boolean
    setShowAuthCard: React.Dispatch<React.SetStateAction<boolean>>
}

const Annoucements: React.FC<Props> = ({ IsLoadingMore, Annoucements, OnLoadMoredata, IsLoading, page, totalPages, showAuthCard, setShowAuthCard }) => {
    const { lan } = useContext(lanContext);

    // Show skeletons only on initial load (page 1 and no announcements yet)
    const isInitialLoading = IsLoading && Annoucements.length === 0;

    if (Annoucements.length === 0 && !IsLoading) {
        return (
            <View style={style.EmptyContainer}>
                <Text style={style.NO_ANNOUNCEMENTS_FOUND}>
                    {TranslateText[lan].NO_ANNOUNCEMENTS_FOUND}
                </Text>
            </View>
        )
    }
    return (
        <ScrollView style={style.Container}>
            <View style={style.Inner}>
                {isInitialLoading ? (
                    new Array(5).fill(0).map((_, index) => (
                        <AnnouncementSkeleton key={`skeleton-${index}`} />
                    ))
                ) : (
                    Annoucements.map((item) => (
                        <Annoucment
                            announcement={item}
                            key={item.announcementId}
                            showAuthCard={showAuthCard}
                            setShowAuthCard={setShowAuthCard}
                        />
                    ))
                )}
            </View>
            {page < totalPages && (
                <View style={style.LoadMoreContainer}>
                    <TouchableOpacity
                        style={[
                            style.LoadMoreButton,
                            IsLoading && style.LoadMoreButtonDisabled
                        ]}
                        onPress={OnLoadMoredata}
                        disabled={IsLoading}
                        activeOpacity={0.7}
                    >
                        {IsLoadingMore ? (
                            <ActivityIndicator size="small" color="#000" />
                        ) : (
                            <Text style={style.LoadMoreButtonText}>
                                {TranslateText[lan].LOAD_MORE}
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
    )
}

const style = StyleSheet.create({
    Container: {
        flex: 1,
    },
    Inner: {
        flexDirection: "column",
        gap: 15,
        paddingBottom: 50,
    },
    EmptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    NO_ANNOUNCEMENTS_FOUND: {
        fontFamily: "Poppins_500Medium",
        fontSize: 18,
        color: "#000",
    },
    LoadMoreContainer: {
        alignItems: "center",
        paddingBottom: 150,
    },
    LoadMoreButton: {
        backgroundColor: "rgba(249, 200, 6, 0.9)",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 10,
        minWidth: 120,
        alignItems: "center",
        justifyContent: "center",

    },
    LoadMoreButtonDisabled: {
        opacity: 0.6,
    },
    LoadMoreButtonText: {
        color: "black",
        fontSize: 14,
        fontWeight: "500",
        fontFamily: " Poppins_600SemiBold",
    },
})

export default Annoucements