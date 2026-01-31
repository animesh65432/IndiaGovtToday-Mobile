import { Skeleton } from "@rneui/themed"
import React from "react"
import { StyleSheet, View } from "react-native"

const AnnouncementSkeleton: React.FC = () => {
    console.log("Rendering Announcement Skeleton")
    return (
        <View style={styles.container}>
            {/* Header Row */}
            <View style={styles.headerRow}>
                <Skeleton style={styles.headerTitle} />
                <Skeleton style={styles.headerCircle} />
            </View>

            {/* Section 1 */}
            <View style={styles.section}>
                <Skeleton style={[styles.line, styles.full, { backgroundColor: "#4B5563" }]} />
                <Skeleton style={[styles.line, styles.fiveSixth, { backgroundColor: "#4B5563" }]} />
                <Skeleton style={[styles.line, styles.threeFourth, { backgroundColor: "#4B5563" }]} />
            </View>

            {/* Section 2 */}
            <View style={styles.section}>
                <Skeleton style={[styles.line, styles.full, { backgroundColor: "#6B7280" }]} />
                <Skeleton style={[styles.line, styles.fiveSixth, { backgroundColor: "#6B7280" }]} />
                <Skeleton style={[styles.line, styles.threeFourth, { backgroundColor: "#6B7280" }]} />
            </View>

            {/* Section 3 */}
            <View style={styles.section}>
                <Skeleton style={[styles.line, styles.full, { backgroundColor: "#9CA3AF" }]} />
                <Skeleton style={[styles.line, styles.fiveSixth, { backgroundColor: "#9CA3AF" }]} />
                <Skeleton style={[styles.line, styles.threeFourth, { backgroundColor: "#9CA3AF" }]} />
            </View>

            {/* Footer */}
            <Skeleton style={[styles.line, styles.oneFourth, { backgroundColor: "#D1D5DB" }]} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "85%",
        alignSelf: "center",
        marginTop: 40,
        padding: 24,
        gap: 24,
    },

    // Header
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerTitle: {
        height: 24,
        width: "66%",
        borderRadius: 6,
        backgroundColor: "#374151",
    },
    headerCircle: {
        height: 24,
        width: 24,
        borderRadius: 12,
        backgroundColor: "#374151",
    },

    // Sections
    section: {
        gap: 8,
    },
    line: {
        height: 16,
        borderRadius: 6,
    },

    // Widths
    full: { width: "100%" },
    fiveSixth: { width: "83%" },
    threeFourth: { width: "75%" },
    oneFourth: { width: "25%" },
})

export default AnnouncementSkeleton