import Annoucment from '@/components/Announcement';
import AnnouncementSkeleton from '@/components/Announcement/Skeleton';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';


export default function AnnouncementDetail() {
    const [announcementId, setAnnouncementId] = useState<string | null>(null);
    const { id } = useLocalSearchParams();

    useEffect(() => {
        if (id && typeof id === 'string') {
            setAnnouncementId(id);
        }
    }, [id])

    if (!announcementId) {
        return <AnnouncementSkeleton />
    }

    return (
        <View style={styles.fullScreen}>
            <Annoucment Id={announcementId} />
        </View>
    );
}

const styles = StyleSheet.create({
    fullScreen: {
        display: 'flex',
        flexDirection: "column"
    }
});