import { api, discordLog } from "./api";

const BASE_URL = "https://api.gauss.jrinvestments.uk/service/"

export interface OpenCatracaParams {
    token: string;
    uid: string;
    device: string;
    direction: string;
}

async function openCatraca(params: OpenCatracaParams) {
    try {
        console.log("params", params);
        const message = `WiseHub App: [Catraca]: ${JSON.stringify(params)}`;
        const logDiscord = await discordLog(message);
        const response = await api.post("/Catraca", params);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const catracaServer = {
    openCatraca,
}