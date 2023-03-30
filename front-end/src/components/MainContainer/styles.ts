import styled, {css} from "styled-components";

export const Container = styled.main`
  ${({theme}) => css`
    max-width: 1200px;
    min-height: 85vh;
    margin: 0 auto;
    padding: 0 24px;
    text-align: center;
  `}
`;
