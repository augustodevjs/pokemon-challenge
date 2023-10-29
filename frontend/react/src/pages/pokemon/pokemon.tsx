import { useEffect, useState } from 'react'
import { Alert, Button, CardPokemon, Header, PokemonService, PokemonTipoService, PokemonTipoViewModel, PokemonViewModel, Select, SelectOption, useModal } from "../../shared"
import { AddPokemonModal, EditPokemonModal, RemovePokemonModal } from './components'

import * as S from './styles'

export const Pokemon = () => {
  const [dataPokemon, setDataPokemon] = useState<PokemonViewModel[]>([])
  const [dataPokemonTipo, setDataPokemonTipo] = useState<PokemonTipoViewModel[]>([]);

  const [selectedPokemon, setSelectedPokemon] = useState<PokemonViewModel>();
  const [selectedValuePokemonTipo, setSelectedValuePokemonTipo] = useState<SelectOption | null>(null);

  const [isAddModalOpen, openAddModal, closeAddModal] = useModal();
  const [isEditModalOpen, openEditModal, closeEditModal] = useModal();
  const [isRemoveModalOpen, openRemoveModal, closeRemoveModal] = useModal();

  const handleEdit = (pokemon: PokemonViewModel) => {
    setSelectedPokemon(pokemon);
    openEditModal();
  };

  const handleRemove = (pokemon: PokemonViewModel) => {
    setSelectedPokemon(pokemon);
    openRemoveModal();
  };

  const loadData = async () => {
    try {
      const pokemon = await PokemonService.getAll();
      const pokemonTipo = await PokemonTipoService.getAll();

      setDataPokemon(pokemon)
      setDataPokemonTipo(pokemonTipo);
    } catch (error) {
      Alert.callError({
        title: (error as Error).name,
        description: (error as Error).message,
      });
    }
  }

  const filter = async () => {
    try {
      if (selectedValuePokemonTipo) {
        const pokemonsFiltered = await PokemonService.getAllByPokemonType({ id: selectedValuePokemonTipo.value });
        setDataPokemon(pokemonsFiltered);
      }
    } catch (error) {
      Alert.callError({
        title: (error as Error).name,
        description: (error as Error).message,
      });
    }
  }

  const clearPreferences = async () => {
    const getPokemonIdArray = dataPokemon.map(data => data.pokemonTipo.id);

    if (selectedValuePokemonTipo) {
      setSelectedValuePokemonTipo(null);

      if (new Set(getPokemonIdArray).size === 1 || getPokemonIdArray.length === 0) {
        await loadData();
      }
    }
  };

  const pokemonTipoOptions: SelectOption[] = dataPokemonTipo.map((client) => ({
    value: client.id,
    label: client.nome,
  }));

  useEffect(() => {
    loadData()
  }, [])

  return (
    <>
      <Header onAdd={openAddModal} />
      <S.Container>
        <h1>Lista de Pokemons</h1>

        <S.Search>
          <div className="filter">
            <Select
              options={pokemonTipoOptions}
              value={selectedValuePokemonTipo}
              onChange={setSelectedValuePokemonTipo}
              placeholder="Selecione o tipo do Pokemon"
            />
            <Button
              onClick={filter}
              disabled={!selectedValuePokemonTipo}
            >
              Buscar
            </Button>

            <Button
              disabled={!selectedValuePokemonTipo}
              onClick={clearPreferences}
            >
              Limpar filtro
            </Button>
          </div>

        </S.Search>

        {dataPokemon.length !== 0 ? (
          <S.Cards>
            {dataPokemon.map(data => (
              <CardPokemon
                key={data.id}
                nome={data.nome}
                imageUrl={data.imagemUrl}
                description={data.descricao}
                type={data.pokemonTipo.nome}
                onEdit={() => handleEdit(data)}
                onDelete={() => handleRemove(data)}
              />
            ))}
          </S.Cards>
        ) : (
          <S.NoData>
            Não há pokemons para exibir
          </S.NoData>
        )}

        <AddPokemonModal
          setData={setDataPokemon}
          isOpen={isAddModalOpen}
          onRequestClose={closeAddModal}
        />

        <EditPokemonModal
          setData={setDataPokemon}
          isOpen={isEditModalOpen}
          onRequestClose={closeEditModal}
          id={selectedPokemon?.id.toString()}
        />

        <RemovePokemonModal
          setData={setDataPokemon}
          isOpen={isRemoveModalOpen}
          name={selectedPokemon?.nome}
          onRequestClose={closeRemoveModal}
          id={selectedPokemon?.id.toString()}
        />
      </S.Container>
    </>
  )
}