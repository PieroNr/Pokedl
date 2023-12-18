import axios, {AxiosInstance} from "axios";

const apiClient: AxiosInstance = axios.create({
    baseURL: "https://api.pokemontcg.io/v2",
    headers: {
        "Content-type": "application/json",
    },
});

export default apiClient;