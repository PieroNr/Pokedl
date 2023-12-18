import http from "../http-common-cards.ts";

class PokemonCardService {
    getAll() {
        return http.get("/cards");
    }

    get(id: any) {
        return http.get(`/cards?q=name:${id}`);
    }

}

export default new PokemonCardService();