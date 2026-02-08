import { createContext, useState } from "react";

export const AnnouncementContext = createContext<{
    DoesItadd: boolean;
    SetDoesItadd: React.Dispatch<React.SetStateAction<boolean>>;
}>({
    DoesItadd: false,
    SetDoesItadd: () => { }
})

export const AnnouncementProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [DoesItadd, SetDoesItadd] = useState(false);

    return (
        <AnnouncementContext.Provider value={{ DoesItadd, SetDoesItadd }}>
            {children}
        </AnnouncementContext.Provider>
    )
}

export default AnnouncementContext;