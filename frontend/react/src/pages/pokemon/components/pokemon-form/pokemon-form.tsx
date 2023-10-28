import * as S from './pokemon-form.styles'
import { TextInput, FormPokemonInputModel, TextAreaInput } from '../../../../shared';
import { SubmitHandler, useFormContext } from 'react-hook-form';

type Props = {
  onSubmit: SubmitHandler<FormPokemonInputModel>;
  id: string;
};

export const ProductForm: React.FC<Props> = ({ onSubmit, id }) => {
  const { register, handleSubmit, formState } = useFormContext<FormPokemonInputModel>();

  return (
    <S.Form autoComplete='off' onSubmit={handleSubmit(onSubmit)} id={id}>
      <TextInput
        type="text"
        label="Nome"
        isRequired
        placeholder="Digite o nome do pokemon"
        error={formState.errors.nome?.message}
        {...register('nome')}
      />

      <TextAreaInput
        label="descrição"
        isRequired
        placeholder="Digite a descrição do pokemon"
        error={formState.errors.descricao?.message}
        {...register('descricao')}
      />

      <TextInput
        type="text"
        label="Imagem"
        isRequired
        placeholder="Digite a url da imagem do Pokemon"
        error={formState.errors.imagemUrl?.message}
        {...register('imagemUrl')}
      />

      <TextInput
        type="number"
        label="Tipo do Pokemon"
        isRequired
        placeholder="Digite o tipo do Pokemon"
        error={formState.errors.pokemonTipoId?.message}
        {...register('pokemonTipoId')}
      />
    </S.Form>
  );
};
