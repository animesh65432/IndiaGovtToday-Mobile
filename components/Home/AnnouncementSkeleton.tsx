import { Skeleton } from '@rneui/themed';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const AnnouncementSkeleton: React.FC = () => {
    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Skeleton style={styles.departmentBadge} />
                <Skeleton style={styles.timeRow} />
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Body */}
            <View style={styles.body}>
                <Skeleton style={styles.title} />
                <Skeleton style={styles.descriptionLine1} />
                <Skeleton style={styles.descriptionLine2} />
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* State Badge */}
            <Skeleton style={styles.stateBadge} />

            {/* Footer */}
            <View style={styles.footer}>
                <Skeleton style={styles.seeDetails} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
    },

    // Header
    header: {
        gap: 8,
    },
    departmentBadge: {
        width: 100,
        height: 24,
        borderRadius: 20,
    },
    timeRow: {
        width: 120,
        height: 16,
        borderRadius: 4,
    },

    // Divider
    divider: {
        borderBottomColor: '#E5E7EB',
        borderBottomWidth: 1,
        marginVertical: 10,
    },

    // Body
    body: {
        gap: 8,
    },
    title: {
        width: '80%',
        height: 20,
        borderRadius: 4,
    },
    descriptionLine1: {
        width: '100%',
        height: 18,
        borderRadius: 4,
    },
    descriptionLine2: {
        width: '60%',
        height: 18,
        borderRadius: 4,
    },

    // State Badge
    stateBadge: {
        width: 130,
        height: 20,
        borderRadius: 4,
    },

    // Footer
    footer: {
        alignItems: 'flex-end',
        marginTop: 10,
    },
    seeDetails: {
        width: 90,
        height: 18,
        borderRadius: 4,
    },
});

export default AnnouncementSkeleton;