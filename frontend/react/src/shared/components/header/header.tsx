import { useNavigate } from 'react-router-dom';
import * as S from './header.styles';

export const Header = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <S.Container>
      <div className='main'>
        <h1>Pokemon</h1>
        <S.Links>
          <li onClick={() => handleNavigate('/')}>Pokemons</li>
        </S.Links>
      </div>
    </S.Container>
  );
};