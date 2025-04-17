import { api, discordLog } from "./api";

const BASE_URL = "https://api.gauss.jrinvestments.uk/service/"

export interface SocialLoginParams {
    email?: string;
    name?: string;
    sub?: string;
    photo?: string;
    device?: string;
    version?: string;
    username?: string;
    password?: string;
}

async function socialLogin(params: SocialLoginParams) {
    try {
        console.log("params", params);
        const message = `WiseHub App: [Social Login]: ${JSON.stringify(params)}`;
        const logDiscord = await discordLog(message);
        // const response = await api.post("/Security/SocialLogin", params);
        const response = await api.post("sociallogin.php", params, {
            baseURL: BASE_URL,
        });
        console.log("socialLogin:", JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const securityServer = {
    socialLogin,
}