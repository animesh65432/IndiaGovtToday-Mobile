import { createContext } from "react"

export const lanContext = createContext({
    lan: "English",
    setLan: (lan: string) => { }
})