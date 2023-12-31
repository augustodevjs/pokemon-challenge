import styled from 'styled-components';

export const Container = styled.div`
  .image img {
    width: 100%;
    object-fit: cover;
    height: 250px;
  }

  .info {
    padding: 1rem;
    background-color: rgb(41, 41, 46);  

    .name {
      font-weight: 400;
      font-size: 1.5rem;
      line-height: 1.334;
      letter-spacing: 0em;
      margin-bottom: 0.35em;
    }

    .description {
      font-weight: 400;
      font-size: 0.875rem;
      color: rgba(255, 255, 255, 0.7);
    }

    .type {
      font-size: .875rem;
      color: rgba(255, 255, 255, 0.7);
      margin-top: 0.75rem;
    }

    .actions {
      display: flex;
      gap: 0.5rem;
    }

    .actions button {
      margin-top: 1rem;
      width: 100px;
    }
  }
`;
