import { HttpClient, setupPokemonApiConfig, HttpStatusCode, NotFoundError, UnexpectedError, PokemonViewModel } from "../..";

type Input = {
  id: number
}

export const getAllByPokemonType = async ({ id }: Input): Promise<PokemonViewModel[]> => {
  const response = await HttpClient.AxiosHttpClient.of(
    setupPokemonApiConfig()
  ).request({
    url: `/pokemon/pokemon-tipo/${id}`,
    method: "GET",
  });

  switch (response.statusCode) {
    case HttpStatusCode.Ok:
      return response.body as PokemonViewModel[];
    case HttpStatusCode.NotFound:
      throw new NotFoundError();
    default:
      throw new UnexpectedError();
  }
};
