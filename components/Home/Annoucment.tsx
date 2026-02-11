import { addsave, removesave } from "@/api/save";
import SpinningLoader from "@/components/SpinningLoader";
import { AnnouncementContext } from "@/context/Annoucment";
import { lanContext } from "@/context/lan";
import { User as UserContext } from "@/context/user";
import { formatDateRelative } from "@/lib/fromDate";
import { LANGUAGE_CODES } from "@/lib/lan";
import { TranslateText } from "@/lib/translatetext";
import { AnnouncementType } from "@/types";
import { useRouter } from 'expo-router';
import { ArrowRight, Bookmark, Clock, Landmark, X } from 'lucide-react-native';
import React, { useContext, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Toast, } from "toastify-react-native";

type Props = {
    announcement: AnnouncementType;
    showAuthCard: boolean
    setShowAuthCard: React.Dispatch<React.SetStateAction<boolean>>;
    IsSavedbuttonShown?: boolean
    IsRemoved?: boolean
    SetIsRemoved?: React.Dispatch<React.SetStateAction<boolean>>
};

const Announcement: React.FC<Props> = ({ SetIsRemoved, IsRemoved, announcement, setShowAuthCard, IsSavedbuttonShown = true }) => {
    const router = useRouter();
    const { lan } = useContext(lanContext);
    const [IsSaveLoading, SetIsSaveLoading] = useState(false);
    const [IsRemoveLoading, SetIsRemoveLoading] = useState(false);
    const { DoesItadd, SetDoesItadd } = useContext(AnnouncementContext);
    const { isLoggedIn, token, } = useContext(UserContext);

    const handleBookmark = async () => {
        if (!isLoggedIn) {
            setShowAuthCard(true);
            return
        }
        else {
            SetIsSaveLoading(true);
            try {
                await addsave(token, announcement.announcementId) as Response;
                SetDoesItadd(!DoesItadd)
            }
            finally {
                SetIsSaveLoading(false);
            }
        }

    };

    const handleRemoveBookmark = async () => {
        if (!isLoggedIn) {
            setShowAuthCard(true);
            return
        }
        else {
            SetIsRemoveLoading(true);
            try {
                await removesave(announcement.announcementId, token) as Response;
                if (SetIsRemoved) {
                    SetIsRemoved(!IsRemoved)
                }
                Toast.success("Announcement removed from saved list");
            }
            finally {
                SetIsRemoveLoading(false);
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.topRow}>
                    <View style={styles.departmentBadge}>
                        <Text style={styles.departmentText}>{announcement.department}</Text>
                    </View>
                    {IsSavedbuttonShown ?
                        (IsSaveLoading ? <SpinningLoader size={20} color="black" /> :
                            <Bookmark size={20} color="black" onPress={handleBookmark} />
                        )
                        :
                        (IsRemoveLoading ? <SpinningLoader size={20} color="black" /> :
                            <X size={20} color="black" onPress={handleRemoveBookmark} />
                        )
                    }
                </View>

                <View style={styles.timeRow}>
                    <Clock size={14} color="#6B7280" />
                    <Text style={styles.timeText}>
                        {formatDateRelative(announcement.date, LANGUAGE_CODES[lan], lan)}
                    </Text>
                </View>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Body Section */}
            <View style={styles.body}>
                <Text style={styles.title}>{announcement.title}</Text>
                <Text style={styles.description}>{announcement.description}</Text>
            </View>

            {/* Divider */}
            <View style={styles.divider} />
            <View style={styles.footer}>
                <View style={styles.stateContainer} >
                    <View style={styles.stateBadge}>
                        <Landmark size={14} color="black" />
                    </View>
                    <Text style={styles.stateText}>{announcement.state}</Text>
                </View>

                {/* Footer */}
                <Pressable style={styles.FooterContainer} onPress={() => router.navigate(`/announcement/${announcement.announcementId}`)} >
                    <Text style={styles.seeDetails}>
                        {TranslateText[lan].SEE_DETAILS}
                    </Text>
                    <ArrowRight size={14} color="black" />
                </Pressable>
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        padding: 16,
        width: "90%",
        alignSelf: "center",
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
    },

    // Header
    header: {
        gap: 10,
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 8
    },
    departmentBadge: {
        backgroundColor: "rgba(218, 218, 215, 0.1)",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        alignSelf: "flex-start",
        flexShrink: 1
    },
    departmentText: {
        fontFamily: "Poppins_500Medium",
        fontSize: 12,
        letterSpacing: 0.3,
        color: "rgba(249, 200, 6, 0.9)",
    },
    stateContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    stateBadge: {
        backgroundColor: "rgba(188, 188, 188, 0.1)",
        padding: 6,
        borderRadius: 20,
    },
    stateText: {
        fontFamily: "Poppins_500Medium",
        fontSize: 13,
        letterSpacing: 0.3,
        color: "black",
    },

    // Time
    timeRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        alignSelf: "flex-start"
    },
    timeText: {
        fontFamily: "Poppins_400Regular",
        fontSize: 13,
        color: "#6B7280",
        textTransform: "uppercase"
    },

    // Divider
    divider: {
        borderBottomColor: "#E5E7EB",
        borderBottomWidth: 1,
        marginVertical: 10,
    },

    // Body
    body: {
        gap: 6,
    },
    title: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 15,
        color: "#111827",
        lineHeight: 25,
    },
    description: {
        fontFamily: "Poppins_400Regular",
        fontSize: 15,
        color: "#4B5563",
        lineHeight: 25,
    },

    FooterContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        justifyContent: "flex-end",
    },

    seeDetails: {
        fontFamily: " Poppins_500Medium",
        fontSize: 14,
        color: "#111827",
        letterSpacing: 0.2,
    },
    footer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    }
});

export default Announcement;