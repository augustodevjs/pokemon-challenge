import styled from "styled-components";

export const Container = styled.div`
  background-color: #29292E;
  
  div {
    padding: 1rem 2rem 1rem 2rem;
    display: flex;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    gap: 1rem;
  }

  @media(max-width: 410px) {
    .main {
      flex-direction: column;
    }
  }
`