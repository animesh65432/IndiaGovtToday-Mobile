type Env = "PROD" | "dev";

export const API_BASE_URL = "https://indiangovtoday-hmfd.vercel.app"
export const env: Env = process.env.NODE_ENV === "production" ? "PROD" : "dev";
export const LocalhostUrl = "http://192.168.29.193:3000"
export const GoogleClientId = "37607736898-k0lnjdrvui8v6lq3svuqemdcl7c6pd3f.apps.googleusercontent.com"