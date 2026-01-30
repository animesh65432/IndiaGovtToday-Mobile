import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect } from 'react'
import { lanContext } from "./lan"

type Props = {
    children: React.ReactNode
}

const Provider: React.FC<Props> = ({ children }) => {

    const [lan, setLan] = React.useState<string>("English")

    useEffect(() => {
        AsyncStorage.getItem('language')
            .then(storedLan => {
                if (storedLan) setLan(storedLan)
            })
    }, [])


    useEffect(() => {
        AsyncStorage.setItem('language', lan)
    }, [lan])

    return (
        <lanContext.Provider value={{ lan, setLan }}>
            {children}
        </lanContext.Provider>

    )
}

export default Provider