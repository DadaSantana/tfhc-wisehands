import { api } from "./api";

export type Videos = {
    id: string
    url: string
    description: string
    obs: string
}


type GetTvVideosResponse = {
    dateTime: string
    msg: string
    msgKey: string
    result: Videos[]
    status: string
}


async function getTvVideos() {
    try {
        const response = await api.get<GetTvVideosResponse>("/TV/Videos");
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const TvServer = {
    getTvVideos
};