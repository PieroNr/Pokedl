import http from "../http-common-tyradex.ts";

class PokemonGenService {
    getAll() {
        return http.get("/gen");
    }

    get(id: any) {
        return http.get(`/gen/${id}`);
    }

}

export default new PokemonGenService();