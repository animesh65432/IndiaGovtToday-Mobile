import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Save = () => {
    return (
        <View style={styles.container}>
            <Text>Saved Announcements</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
})

export default Save