import { lanContext } from '@/context/lan';
import temp from "@/temp.json";
import React, { useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native'; // ← Fix 1: ScrollView
import Details from "./Details";
import Header from './Header';
import Title from './Title';

type Props = {
    Id: string  // Not used yet
}

const Annoucment: React.FC<Props> = ({ Id }) => {
    const { lan } = useContext(lanContext)

    return (
        <View style={styles.container}>
            <Header />
            <Title title={temp.title} />
            <ScrollView style={styles.scroll}>  {/* ← Fix 2: style prop */}
                <Details
                    date={temp.date}
                    department={temp.department}
                    category={temp.category}
                    lan={lan}
                    source={temp.source_link}
                    state={temp.state}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scroll: {
        flex: 1,
        width: '100%',
    }
})

export default Annoucment
