import Announcement from '@/components/Announcement';
import AnnouncementSkeleton from '@/components/Announcement/Skeleton';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function AnnouncementDetail() {
    const { id } = useLocalSearchParams();

    if (!id || typeof id !== 'string') {
        return <AnnouncementSkeleton />
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <Announcement Id={Array.isArray(id) ? id[0] : id} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    }
});