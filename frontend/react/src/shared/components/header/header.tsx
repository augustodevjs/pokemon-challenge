import { Button, HeaderProps } from '..';
import PokemonSvg from '../../assets/pokemon.svg'

import * as S from './header.styles';

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