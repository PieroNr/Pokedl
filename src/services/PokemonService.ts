import http from "../http-common-tyradex.ts";

class PokemonService {
  getAll() {
    return http.get("/pokemon");
  }

  get(id: any) {
    return http.get(`/pokemon/${id}`);
  }

  getByName(name: any) {
    return http.get(`/pokemon/${name}`);
  }
}

export default new PokemonService();