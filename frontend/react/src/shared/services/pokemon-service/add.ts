import { HttpClient, HttpStatusCode, UnexpectedError, setupPokemonApiConfig, ValidationError, AddPokemonInputModel, AddPokemonViewModel } from "../..";

type Input = {
  data: AddPokemonInputModel;
};

export const add = async ({ data }: Input): Promise<AddPokemonViewModel> => {
  const response = await HttpClient.AxiosHttpClient.of(
    setupPokemonApiConfig()
  ).request({
    url: "/pokemon",
    method: "POST",
    body: data,
  });

  switch (response.statusCode) {
    case HttpStatusCode.Created:
      return response.body as AddPokemonViewModel;
    case HttpStatusCode.BadRequest:
      throw new ValidationError(response.body.erros);
    default:
      throw new UnexpectedError();
  }
};
