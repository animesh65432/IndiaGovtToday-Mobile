import React from 'react';
import { Modal, Text } from 'react-native';

type Props = {
    showAuthCard: boolean,
    setShowAuthCard: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthCard: React.FC<Props> = () => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
        >
            <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginTop: 20 }}>
                Please log in to access this feature.
            </Text>
        </Modal>
    )
}

export default AuthCard