import http from "../http-common-pokeapi.ts";

class PokemonColorsService {
  getAll() {
    return http.get("/pokemon-colors");
  }

  get(id: any) {
    return http.get(`/pokemon-color/${id}`);
  }

}

export default new PokemonColorsService();