import { useCallback, useEffect, useState } from 'react';
import { TextInput, FormPokemonInputModel, TextAreaInput, Select, SelectOption, PokemonTipoViewModel, PokemonTipoService, Alert } from '../../../../shared';
import { Controller, SubmitHandler, useFormContext } from 'react-hook-form';

import * as S from './pokemon-form.styles'

type Props = {
  onSubmit: SubmitHandler<FormPokemonInputModel>;
  id: string;
};

export const PokemonForm: React.FC<Props> = ({ onSubmit, id }) => {
  const { register, handleSubmit, formState, control } = useFormContext<FormPokemonInputModel>();

  const [pokemonTipoData, setPokemonTipoData] = useState<PokemonTipoViewModel[]>([]);

  const loadData = useCallback(async () => {
    try {
      const pokemons = await PokemonTipoService.getAll();
      setPokemonTipoData(pokemons);
    } catch (error) {
      handleError(error as Error);
    }
  }, [setPokemonTipoData]);

  const handleError = (error: Error, title = error.name, description = error.message) => {
    Alert.callError({
      title,
      description,
    });
  };

  const pokemonClients: SelectOption[] = pokemonTipoData.map((client) => ({
    value: client.id,
    label: client.nome,
  }));

  useEffect(() => {
    loadData();
  }, [loadData]);

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

      <Controller
        control={control}
        name="pokemonTipo"
        render={({ field: { onChange, value }, fieldState }) => (
          <S.SelectController>
            <label>Tipo do Pokemon</label>
            <Select
              isClearable
              options={pokemonClients}
              value={pokemonClients.find((el) => el.value === value)}
              onChange={(option: SelectOption | null) => {
                console.log(option)
                if (option === null) {
                  onChange(null);
                  return;
                }
                onChange(option);
              }}
              placeholder="Selecione o tipo do Pokemon"
            />
            {fieldState.error && <span className='error'>{fieldState.error.message}</span>}
          </S.SelectController>
        )}
      />
    </S.Form>
  );
};
