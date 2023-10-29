import styled from 'styled-components';

type Props = {
  isRequired?: boolean;
  error?: string;
};

export const Label = styled.div<Props>`
  margin-bottom: 6px;

  &:after {
    content: '*';
    color: #F75A68;
    margin-left: 6px;
  }
`;

export const Form = styled.form`
  margin-top: 8px;
  font-size: 0.95rem;
  color: #e63343;
`;