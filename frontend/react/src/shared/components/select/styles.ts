import reactSelect from "react-select";
import styled from "styled-components";

export const Select = styled(reactSelect)`
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
`;
