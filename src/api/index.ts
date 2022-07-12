import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5050'
});

export const requestArticles = async (id: number) => {
    return await axiosInstance.get(`http://localhost:5050/${id}`);
};

export const requestArticleDescription = async (id: number) => {
    return await axiosInstance.get(`http://localhost:5050/description/${id}`);
}
