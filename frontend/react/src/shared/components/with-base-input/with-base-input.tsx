import { ComponentType } from "react"
import { WithBaseInputProps } from ".."

export const withBaseInput = <T,>(Component: ComponentType<T>) => {
  return (props: T & WithBaseInputProps) => {
    return (
      <>
        {props.label && (
          <label>
            {props.label}
          </label>
        )}
        <Component {...props} />
        {props.error !== undefined && (
          <form className="text-danger">{props.error}</form>
        )}
      </>
    )
  }
}