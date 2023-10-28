import styled from "styled-components";

export const Container = styled.div`
  background-color: #29292E;
  
  div {
    padding: 1.5rem 2rem 1.5rem 2rem;
    display: flex;
    justify-content: space-between;
    max-width: 1000px;
    margin: 0 auto;
    gap: 1rem;

    img {
      width: 10rem;
      height: 3rem;
    }
    button {
      width: 160px;
    }
  }

  @media(max-width: 410px) {
    .main {
      flex-direction: column;
    }
  }
`