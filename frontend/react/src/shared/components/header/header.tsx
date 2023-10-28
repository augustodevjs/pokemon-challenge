import * as S from './header.styles';
import PokemonSvg from '../../assets/pokemon.svg'
import { Button } from '..';

type HeaderProps = {
  onAdd: () => void
}

export const Header: React.FC<HeaderProps> = ({ onAdd }) => {
  return (
    <S.Container>
      <div className='main'>
        <img src={PokemonSvg} alt="Pokemon" />
        <Button onClick={onAdd}>Novo Pokemon</Button>
      </div>
    </S.Container>
  );
};