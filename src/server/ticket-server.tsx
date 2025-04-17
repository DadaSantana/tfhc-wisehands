import { api } from "./api"

export interface CategoryDTO {
    id: number
    description: string
    status: number
}

type GetAllCategoriesResponse = {
    dateTime: string
    status: string
    msg: string
    msgKey: string
    result: CategoryDTO[]
}

export interface EventDTO {
    id: number
    idcategory: number
    category: string
    price: number
    date: string
    time: string
    title: string
    description: string
    image: string
    currency: string
    addressimage: string
    addressurl: string
    place: string
    obs: string
    status: number
}

type GetAllEventsResponse = {
    dateTime: string
    status: string
    msg: string
    msgKey: string
    result: EventDTO[]
}

async function getAllCategories(token: string) {
    try {
        const response = await api.post<GetAllCategoriesResponse>("/Ticket/Categories", {
            token
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

async function getAllEvents(token: string, idCategory?: number, status?: number) {
    try {
        const response = await api.post<GetAllEventsResponse>("/Ticket/Events", {
            token,
            idCategory,
            status
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const ticketServer = {
    getAllCategories,
    getAllEvents
}