import http from "../http-common-pokeapi.ts";

class PokemonHabitatService {
    getAll() {
        return http.get("/pokemon-habitats");
    }

    get(id: any) {
        return http.get(`/pokemon-habitat/${id}`);
    }

}

export default new PokemonHabitatService();