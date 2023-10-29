import { Controller, SubmitHandler, useFormContext } from 'react-hook-form';
import { TextInput, FormPokemonInputModel, TextAreaInput, RemoteSelect, setupPokemonApiConfig } from '../../../../shared';

import * as S from './pokemon-form.styles'

type Props = {
  onSubmit: SubmitHandler<FormPokemonInputModel>;
  id: string;
};

export const PokemonForm: React.FC<Props> = ({ onSubmit, id }) => {
  const { register, handleSubmit, formState, control } = useFormContext<FormPokemonInputModel>();

  return (
    <S.Form autoComplete='off' onSubmit={handleSubmit(onSubmit)} id={id}>
      <div className='first-text-input'>
        <TextInput
          type="text"
          className='name'
          label="Nome"
          isRequired
          placeholder="Digite o nome do pokemon"
          error={formState.errors.nome?.message}
          {...register('nome')}
        />
      </div>

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

      <div>
        <Controller
          name="pokemonTipo"
          control={control}
          render={({ field }) => (
            <RemoteSelect
              apiConfig={setupPokemonApiConfig()}
              endpoint="/pokemon-tipo"
              label="Tipo do Pokemon"
              error={formState.errors.pokemonTipo?.nome?.message}
              {...field}
            />
          )}
        />
      </div>
    </S.Form>
  );
};
