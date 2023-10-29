import { Button, CardPokemonProps } from '..';

import * as S from './card-pokemon.styles'

export const CardPokemon: React.FC<CardPokemonProps> = ({ imageUrl, nome, description, type, onDelete, onEdit }) => {
  return (
    <S.Container>
      <div className="image">
        <img src={imageUrl} />
      </div>
      <div className="info">
        <p className='name'>{nome}</p>
        <p className='description'>{description}</p>
        <p className='type'>Tipo do Pokemon: {type}</p>
        <div className="actions">
          <Button onClick={onEdit}>Editar</Button>
          <Button variant='danger' onClick={onDelete}>Deletar</Button>
        </div>
      </div>
    </S.Container>
  )
}