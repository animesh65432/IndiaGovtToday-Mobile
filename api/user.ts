import { Call } from "../service/call";

export const singinwithgoogle = (name: string, email: string) => Call({
    path: "/auth",
    method: "POST",
    request: {
        name,
        email
    }
})

