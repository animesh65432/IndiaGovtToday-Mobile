type Env = "PROD" | "dev";

export const API_BASE_URL = "https://indiangovtoday-hmfd.vercel.app"
export const env: Env = process.env.NODE_ENV === "production" ? "PROD" : "dev";
export const LocalhostUrl = "http://192.168.29.193:3000"
export const GoogleClientId = process.env.GOOGLE_CLIENT_ID || "";
