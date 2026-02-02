import { getAnnouncement } from '@/api/announcements';
import { lanContext } from '@/context/lan';
import { usetexttospech } from '@/hooks/usetexttospech';
import { ShowAnnouncementTypes } from "@/types";
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ShareSection from '../ShareSection';
import Details from "./Details";
import Header from './Header';
import KeyInformation from './KeyInformation';
import AnnouncementSkeleton from './Skeleton';
import TextDiv from './TextDiv';
import Title from './Title';

type Props = {
    Id: string
}

const Annoucment: React.FC<Props> = ({ Id }) => {
    const [toggleShare, setToggleShare] = useState(false);
    const { lan } = useContext(lanContext)
    const audioHook = usetexttospech()
    const [announcement, setannouncement] = useState<ShowAnnouncementTypes | null>(null)
    const [IsLoading, SetIsLoading] = useState<boolean>(false)

    async function fetch() {
        SetIsLoading(true)
        try {
            const response = await getAnnouncement(lan, Id) as { data: ShowAnnouncementTypes }
            setannouncement(response.data)
        }
        finally {
            SetIsLoading(false)
        }
    }

    useEffect(() => {
        if (Id) {
            fetch()
        }
    }, [Id, lan])

    if (IsLoading || !announcement) {
        return <View style={styles.container}>
            <AnnouncementSkeleton />
        </View>
    }

    return (
        <View style={styles.container}>

            <Header
                toggleShare={toggleShare}
                setToggleShare={setToggleShare}
                Annoucment={announcement}
                audioHook={audioHook}
            />
            <Title title={announcement.title} />

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Details
                    date={announcement.date}
                    department={announcement.department}
                    category={announcement.category}
                    lan={lan}
                    source={announcement.source_link}
                    state={announcement.state}
                />
                <TextDiv
                    heading={announcement.sections[0].heading}
                    content={'content' in announcement.sections[0] ?
                        announcement.sections[0].content : 'Content not available'
                    }

                />
                <TextDiv
                    heading={announcement.sections[1].heading}
                    content={'content' in announcement.sections[1] ?
                        announcement.sections[1].content : 'Content not available'
                    }
                />
                <KeyInformation
                    heading={announcement.sections[2].heading}
                    points={'points' in announcement.sections[2] ? announcement.sections[2].points : []}
                />
            </ScrollView>
            {toggleShare &&
                <ShareSection
                    Announcement={announcement.title}
                    setisShareOpen={setToggleShare}
                    isShareOpen={toggleShare}
                    shareUrl={`https://indiangovtoday.app/announcement?id=${announcement.announcementId}&lan=${lan}`}
                />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 30,
        flexDirection: 'column',
        gap: 15,
        width: "100%"
    },
    scroll: {
        flex: 1,
        width: "100%",
        display: "flex",
        paddingBottom: 10,
        flexDirection: "column"
    },
    scrollContent: {
        paddingBottom: 20,
        flexGrow: 1,
    }
})

export default Annoucment
