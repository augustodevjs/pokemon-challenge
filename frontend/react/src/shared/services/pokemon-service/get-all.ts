import { HttpClient, setupPokemonApiConfig, HttpStatusCode, UnexpectedError, PokemonViewModel } from "../..";

export const getAll = async (): Promise<PokemonViewModel[]> => {
  const response = await HttpClient.AxiosHttpClient.of(
    setupPokemonApiConfig()
  ).request({
    url: "/pokemon",
    method: "GET",
  });

  switch (response.statusCode) {
    case HttpStatusCode.Ok:
      return response.body as PokemonViewModel[];
    default:
      throw new UnexpectedError();
  }
};
