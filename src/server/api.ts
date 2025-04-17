import axios from "axios";

const DISCORD_LOG_WEBHOOK = "https://discord.com/api/webhooks/1181667288131321866/MFYlHQ3xj1n8HF67f_BQz0bZpmzqZaQAdvGdXu9HlsMFJuF9DyQ34vp1tvree4j97Icv";

export const api = axios.create({
    baseURL: "https://api.newton.jrinvestments.uk/api",
});

export async function discordLog(message: string) {
    try {
        await axios.post(DISCORD_LOG_WEBHOOK, {
            content: message,
        });
    } catch (error) {
        console.error(error);
    }
}