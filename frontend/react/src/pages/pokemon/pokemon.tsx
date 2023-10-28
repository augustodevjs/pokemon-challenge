import * as S from './styles'
import { useEffect, useState } from 'react'
import PokemonSvg from '../../shared/assets/pokemon.svg'
import { AddPokemonModal, RemovePokemonModal } from './components'
import { Alert, Button, CardPokemon, PokemonService, PokemonViewModel, useModal } from "../../shared"

export const Pokemon = () => {
  const [data, setData] = useState<PokemonViewModel[]>([])
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonViewModel>();

  const [isAddModalOpen, openAddModal, closeAddModal] = useModal();
  const [isRemoveModalOpen, openRemoveModal, closeRemoveModal] = useModal();

  const handleRemove = (pokemon: PokemonViewModel) => {
    setSelectedPokemon(pokemon);
    openRemoveModal();
  };

  const loadData = async () => {
    try {
      const response = await PokemonService.getAll();
      setData(response)
    } catch (error) {
      Alert.callError({
        title: (error as Error).name,
        description: (error as Error).message,
      });
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  return (
    <S.Container>
      <S.Header>
        <S.Content>
          <img src={PokemonSvg} alt="" />
        </S.Content>

        <S.ButtonGroup>
          <Button onClick={openAddModal}>Novo Pokemon</Button>
        </S.ButtonGroup>
      </S.Header>

      {data.length !== 0 ? (
        <S.Cards>
          {data.map(data => (
            <CardPokemon
              key={data.id}
              nome={data.nome}
              imageUrl={data.imagemUrl}
              description={data.descricao}
              onEdit={() => console.log(data)}
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
        setData={setData}
        isOpen={isAddModalOpen}
        onRequestClose={closeAddModal}
      />

      <RemovePokemonModal
        setData={setData}
        isOpen={isRemoveModalOpen}
        name={selectedPokemon?.nome}
        onRequestClose={closeRemoveModal}
        id={selectedPokemon?.id.toString()}
      />
    </S.Container>
  )
}