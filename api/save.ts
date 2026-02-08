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
    path: `/removeSave?announcementId=${id}`,
    headers: {
        "Authorization": `Bearer ${token}`
    }
})
export const GetallSaves = (token: string, lan: string, page: number, totalPages: number) => Call({
    method: "GET",
    path: `/getSavedAnnouncements?lan=${lan}&page=${page}&limit=${totalPages}`,
    headers: {
        "Authorization": `Bearer ${token}`,
    }
})