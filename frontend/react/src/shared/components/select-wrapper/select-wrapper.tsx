import { SelectWrapperProps } from ".."
import * as S from './select-wrapper.styles'

export const SelectWrapper: React.FC<SelectWrapperProps> = ({ children, isInvalid, variant }) => {
  return <S.Wrapper isInvalid={isInvalid} variant={variant}>{children}</S.Wrapper>
}