import { api } from "./api";

export type Books = {
    autor: string
    bookin?: string
    bookout?: string
    cover: string
    createdat: string
    description: string
    genero: string
    id: number
    iduser: number
    name: string
    status: number
    year: string
}

export interface BookDTO {
    id: number
    createdat: string
    name: string
    description: string
    autor: string
    genero: string
    year: string
    status: number
    cover: string
    isbn: string
    returnAT: string
    bookout: string
    bookin: string
    iduser: number
    user: string
    email: string
}

type GetBookByIdResponse = {
    dateTime: string
    status: string
    msg: string
    msgKey: string
    result: BookDTO[]
}

type GetAllBooksResponse = {
    dateTime: string
    msg: string
    msgKey: string
    result: Books[]
    status: string
}

type GetHistoryRentedBooksResponse = {
    dateTime: string
    status: string
    msg: string
    msgKey: string
    result: BookDTO[]
}

function getFileNameFromUri(photoUri) {
    // Usamos split para dividir a string com base na barra "/" e pegar o último elemento
    const parts = photoUri.split('/');
    return parts[parts.length - 1]; // Retorna o último elemento, que é o nome do arquivo
}

async function getAllBooksAvailable(token: string) {
    try {
        const response = await api.post<GetAllBooksResponse>("/WiseBooks/Books", {
            token,
            id: -1,
            bookin: 1
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

async function getAllBooksInUse(token: string) {
    try {
        const response = await api.post<GetAllBooksResponse>("/WiseBooks/Books", {
            token,
            id: -1,
            bookout: 1
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

async function getBookById(token: string, id: string) {
    try {
        const response = await api.post<GetBookByIdResponse>("/WiseBooks/Books", {
            token,
            id
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

async function getHistoryRentedBooks(token: string) {
    try {
        const response = await api.post<GetHistoryRentedBooksResponse>("/WiseBooks/MyBooks", {
            token
        });
        const books = response.data.result;
        // console.log("Books: ", books);

        // Filter to return only books where bookin is null
        const filteredBooks = books.filter(book => book.bookin === null);
        response.data.result = filteredBooks;
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

async function getHistoryReturnedBooks(token: string) {
    try {
        const response = await api.post<GetHistoryRentedBooksResponse>("/WiseBooks/MyBooks", {
            token
        });
        const books = response.data.result;

        // Filter to return only books where bookin is not null
        const filteredBooks = books.filter(book => book.bookin !== null);
        response.data.result = filteredBooks;
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

async function rentBook(token: string, bookId: string, returnAT: string) {
    try {
        console.log("Rent Book: ", token, bookId, returnAT);
        const response = await api.post("/WiseBooks/BookOut", {
            token,
            IDBook: bookId,
            returnAT
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

async function HistoryRentedBooks(token: string) {
    try {
        const response = await api.post<GetHistoryRentedBooksResponse>("/WiseBooks/MyBooks", {
            token
        });
        const books = response.data.result;

        // Filter to return only books where bookin is null
        const filteredBooks = books.filter(book => book.bookin === null);
        return filteredBooks;
    } catch (error) {
        console.error(error);
    }
}

// multipart/form-data
async function uploadPhoto(photoUri, folderName) {
    const fileName = getFileNameFromUri(photoUri);
    const formData = new FormData();
    formData.append("files", {
        uri: photoUri,
        name: fileName,
        type: "image/jpg"
    });

    try {
        const response = await api.post(`/WiseBooks/Upload?FolderName=${folderName}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "accept": "*/*"
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

async function returnBook(token: string, idcontrol: string, receipt: string, deliveryPoint: string) {
    try {
        const response = await api.post("/WiseBooks/BookIn", {
            token,
            idcontrol,
            receipt,
            deliveryPoint: 1
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const wiseBookServer = {
    getAllBooksAvailable,
    getAllBooksInUse,
    getHistoryRentedBooks,
    getHistoryReturnedBooks,
    getBookById,
    rentBook,
    HistoryRentedBooks,
    uploadPhoto,
    returnBook
};