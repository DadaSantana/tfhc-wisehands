import { api } from "./api";

async function setPaidCourse(token: string) {
    try {
        console.log("Token: ", token);
        const response = await api.post("/Financial/PaidCourse", {
            token
        });

        console.log("Response: ", response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const academyServer = { setPaidCourse };