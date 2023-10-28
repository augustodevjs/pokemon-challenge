import { HttpClient, setupPokemonApiConfig, HttpStatusCode, UnexpectedError, PokemonTipoViewModel } from "../..";

export const getAll = async (): Promise<PokemonTipoViewModel[]> => {
  const response = await HttpClient.AxiosHttpClient.of(
    setupPokemonApiConfig()
  ).request({
    url: "/pokemon-tipo",
    method: "GET",
  });

  switch (response.statusCode) {
    case HttpStatusCode.Ok:
      return response.body as PokemonTipoViewModel[];
    default:
      throw new UnexpectedError();
  }
};
