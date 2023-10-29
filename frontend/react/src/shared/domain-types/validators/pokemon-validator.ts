import * as yup from 'yup';

export const pokemonValidator = yup.object({
  pokemonTipo: yup.object({
    id: yup.number().required("Campo obrigatório"),
    nome: yup.string().required("Campo obrigatório"),
  }),
  nome: yup.string().required('Campo obrigatório'),
  imagemUrl: yup.string().required('Campo obrigatório').url('Deve ser uma URL válida'),
  descricao: yup.string().required('Campo obrigatório'),
});