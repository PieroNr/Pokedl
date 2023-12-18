import axios, { AxiosInstance } from "axios";

const apiClient: AxiosInstance = axios.create({
    baseURL: "https://tyradex.tech/api/v1",
    headers: {
        "Content-type": "application/json",
    },
});

export default apiClient;