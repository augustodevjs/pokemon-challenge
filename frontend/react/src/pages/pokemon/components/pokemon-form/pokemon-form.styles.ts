import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  .first-text-input {
    padding-top: 1rem;
  }
`;

export const SelectController = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    &:after {
      content: '*';
      color: #f75a68;
      margin-left: 6px;
    }
  }

  .error {
    font-size: 0.95rem;
    color: #e63343;
  }
`;
