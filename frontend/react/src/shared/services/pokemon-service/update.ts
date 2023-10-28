import { UpdatePokemonInputModel, UpdatePokemonViewModel, HttpClient, HttpStatusCode, NotFoundError, UnexpectedError, ValidationError, setupPokemonApiConfig } from "../..";

type Input = {
  id: number;
  data: UpdatePokemonInputModel
};

export const update = async ({ data, id }: Input): Promise<UpdatePokemonViewModel> => {
  const response = await HttpClient.AxiosHttpClient.of(
    setupPokemonApiConfig()
  ).request({
    url: `/pokemon/${id}`,
    method: "PUT",
    body: data,
  });

  switch (response.statusCode) {
    case HttpStatusCode.Ok:
      return response.body as UpdatePokemonViewModel;
    case HttpStatusCode.BadRequest:
      throw new ValidationError(response.body.erros);
    case HttpStatusCode.NotFound:
      throw new NotFoundError();
    default:
      throw new UnexpectedError();
  }
};
