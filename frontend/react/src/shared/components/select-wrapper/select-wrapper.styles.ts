import styled from 'styled-components'

type SelectWrapperProps = {
  isInvalid: boolean
  variant: string | undefined
}

export const Wrapper = styled.div<SelectWrapperProps>`
div {
  div:first-child {
    padding: 0.3rem;
  }
  
  div {
    background-color: #121214;
    padding: 0.3rem;
    border: 0;
    color: white;

    .select__placeholder {
      color: #7c7c8a;  
    }
  }
}
`
