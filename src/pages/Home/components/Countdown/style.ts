import styled from 'styled-components';

export const CountdownContainer = styled.div`
  font-size: 10rem;
  line-height: 8rem;
  display: flex;
  gap: 1rem;

  color: ${(props) => props.theme['gray-100']};

  span {
    font-family: 'Roboto Mono', monospace;
    background-color: ${(props) => props.theme['gray-700']};
    padding: 2rem 1rem;
    border-radius: 8px;
  }
`;

export const Separator = styled.div`
  display: flex;
  justify-content: center;
  width: 4rem;
  padding: 2rem 0;
  overflow: hidden;
  color: ${(props) => props.theme['green-500']};
`;
