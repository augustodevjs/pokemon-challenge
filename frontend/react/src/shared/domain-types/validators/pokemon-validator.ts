import * as yup from 'yup';

export const pokemonValidator = yup.object({
  pokemonTipo: yup.object({
    value: yup.number().required('Campo obrigatório').integer('Deve ser um número inteiro positivo'),
    label: yup.string().required('Campo obrigatório'),
  }).required('Campo obrigatório'),

  nome: yup.string().required('Campo obrigatório'),
  imagemUrl: yup.string().required('Campo obrigatório').url('Deve ser uma URL válida'),
  descricao: yup.string().required('Campo obrigatório'),
});