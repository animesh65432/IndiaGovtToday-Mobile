import { lanContext } from '@/context/lan';
import temp from "@/temp.json";
import React, { useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Details from "./Details";
import Header from './Header';
import KeyInformation from './KeyInformation';
import TextDiv from './TextDiv';
import Title from './Title';

type Props = {
    Id: string
}

const Annoucment: React.FC<Props> = ({ Id }) => {
    const { lan } = useContext(lanContext)

    return (
        <View style={styles.container}>

            <Header />
            <Title title={temp.title} />

            <ScrollView
                style={styles.scroll}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Details
                    date={temp.date}
                    department={temp.department}
                    category={temp.category}
                    lan={lan}
                    source={temp.source_link}
                    state={temp.state}
                />
                <TextDiv
                    heading={temp.sections[0].heading}
                    content={temp.sections[0].content!}

                />
                <TextDiv
                    heading={temp.sections[1].heading}
                    content={temp.sections[1].content!}

                />
                <KeyInformation
                    heading={temp.sections[2].heading}
                    points={temp.sections[2].points!}
                />
            </ScrollView>
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
