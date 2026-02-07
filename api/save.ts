import { Call } from "@/service/call"


export const addsave = (token: string, announcementId: string) => Call({
    method: "POST",
    path: "/addSave",
    headers: {
        "Authorization": `Bearer ${token}`,
    },
    request: {
        announcementId
    }
})

export const removesave = (id: string, token: string) => Call({
    method: "DELETE",
    path: `/removeSave/${id}`,
    headers: {
        "Authorization": `Bearer ${token}`
    }
})
export const GetallSaves = (token: string) => Call({
    method: "GET",
    path: "/getSavedAnnouncements",
    headers: {
        "Authorization": `Bearer ${token}`
    }
})