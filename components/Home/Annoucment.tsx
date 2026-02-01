import { lanContext } from "@/context/lan";
import { formatDateRelative } from "@/lib/fromDate";
import { LANGUAGE_CODES } from "@/lib/lan";
import { TranslateText } from "@/lib/translatetext";
import { AnnouncementType } from "@/types";
import { useRouter } from 'expo-router';
import { Building, MoveRight } from 'lucide-react-native';
import React, { useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
    announcement: AnnouncementType;
};

const Announcement: React.FC<Props> = ({ announcement }) => {
    const router = useRouter();
    const { lan } = useContext(lanContext);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.topRow}>
                    <View style={styles.departmentBadge}>
                        <Text style={styles.departmentText}>{announcement.department}</Text>
                    </View>
                </View>

                <View style={styles.timeRow}>
                    <Text style={styles.timeText}>
                        🕐 {formatDateRelative(announcement.date, LANGUAGE_CODES[lan], lan)}
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

            <View style={styles.stateBadge}>
                <Building size={14} color="#6B7280" />
                <Text style={styles.stateText}>{announcement.state}</Text>
            </View>

            {/* Footer */}
            <Pressable style={styles.FooterContainer} onPress={() => router.navigate(`https://indiangovtoday.app/announcement?id=${announcement.announcementId}&lan=${lan}`)} >
                <Text style={styles.seeDetails}>
                    {TranslateText[lan].SEE_DETAILS}
                </Text>
                <MoveRight size={14} color="#111827" />
            </Pressable>
        </View>
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
        backgroundColor: "#E5E5E5",
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 20,
        alignSelf: "flex-start",
        flexShrink: 1
    },
    departmentText: {
        fontFamily: "Inter_500Medium",
        fontSize: 11,
        letterSpacing: 0.3,
        color: "#374151",
    },
    stateBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    stateText: {
        fontFamily: "Inter_500Medium",
        fontSize: 13,
        letterSpacing: 0.3,
        color: "#374151",
    },

    // Time
    timeRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    timeText: {
        fontFamily: "Poppins_400Regular",
        fontSize: 12,
        color: "#6B7280",
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
        fontFamily: "Inter_600SemiBold",
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
        marginTop: 10,
    },

    seeDetails: {
        fontFamily: "Inter_600SemiBold",
        fontSize: 14,
        color: "#111827",
        letterSpacing: 0.2,
    },
});

export default Announcement;