import http from "../http-common-pokeapi.ts";

class PokemonSpeciesService {
  getAll() {
    return http.get("/pokemon-species");
  }

  get(id: any) {
    return http.get(`/pokemon-species/${id}`);
  }

  getPokemon(id: any) {
    return http.get(`/pokemon/${id}`);
  }
  findByName(name: any) {
    return http.get(`/pokemon-species?name=${name}`);
  }
}

export default new PokemonSpeciesService();