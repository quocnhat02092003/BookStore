import axios from "axios"

export const getDealOfWeekBooks = async ()  => {
    const response = await axios.get(`https://openlibrary.org/search.json?q=first_publish_year:[2025 TO 2025]&mode=ebooks&sort=rating&limit=10`);
    if (response.status !== 200) {
        throw new Error(response.data.message);
    }
    return response.data;
}

export const getProductById = async (id: string) => {
    const response = await axios.get(`https://openlibrary.org/works/${id}.json`);
    if (response.status !== 200) {
        throw new Error(response.data.message);
    }
    return response.data;
}
