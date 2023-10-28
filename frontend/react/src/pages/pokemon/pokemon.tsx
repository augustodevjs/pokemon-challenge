import * as S from './styles'
import { Button, CardPokemon } from "../../shared"
import PokemonSvg from '../../shared/assets/pokemon.svg'

export const Pokemon = () => {
  return (
    <S.Container>
      <S.Header>
        <S.Content>
          <img src={PokemonSvg} alt="" />
        </S.Content>

        <S.ButtonGroup>
          <Button onClick={() => console.log('oi')}>Novo Pokemon</Button>
        </S.ButtonGroup>
      </S.Header>

      <S.Cards>
        <CardPokemon imageUrl="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*wfFCdF0GVcEMhIK9ESU-Bg.jpeg" nome='teste' description='Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica' />
        <CardPokemon imageUrl="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*wfFCdF0GVcEMhIK9ESU-Bg.jpeg" nome='teste' description='Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica' />
        <CardPokemon imageUrl="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*wfFCdF0GVcEMhIK9ESU-Bg.jpeg" nome='teste' description='Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica' />
      </S.Cards>
    </S.Container>
  )
}