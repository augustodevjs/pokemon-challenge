import { ComponentType } from "react"
import { WithBaseInputProps } from ".."
import * as S from './with-base-input.styles'

export const withBaseInput = <T,>(Component: ComponentType<T>) => {
  return (props: T & WithBaseInputProps) => {
    return (
      <>
        {props.label && (
          <S.Label>
            {props.label}
          </S.Label>
        )}
        <Component {...props} />
        {props.error !== undefined && (
          <S.Form>{props.error}</S.Form>
        )}
      </>
    )
  }
}