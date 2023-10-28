import styled from "styled-components";

export const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;

  h1 {
    margin-bottom: 1rem;
  }
`;

export const Search = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2rem;

  .filter {
    display: flex;
    gap: 1rem;
    button:nth-child(2) {
      width: 100px;
    }
  }

  .select__control {
    width: 350px !important;
  }
`;

export const Content = styled.div`
  img {
    width: 10rem;
  }

  h1 {
    font-size: 1.25rem;
  }

  p {
    font-size: 1rem;
  }
`;

export const Cards = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1.5rem;

  @media(max-width: 960px) {
    grid-template-columns: 1fr 1fr;
  }

  @media(max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media(max-width: 550px) {
    margin-top: 1rem;
  }

  button {
    padding: 0.9rem 1.75rem;
    width: max-content;
  }
`;

export const Tasks = styled.main`
  ul {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    li {
      display: flex;
      padding: 1.5rem;
      border-radius: 0.25rem;
      align-items: center;
      gap: 2rem;
      justify-content: space-between;
      background: #29292E;

      div {
        p {
          font-size: 1.3rem;
          font-weight: bold;
        }
      }
    }
  }
`

export const NoData = styled.div`
  background-color: #29292e;
  padding: 1.5rem;
  text-align: center;
  color: #e1e1e6;
  width: 100%;
`