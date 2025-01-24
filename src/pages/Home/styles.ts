import styled from 'styled-components';

export const HomeContainer = styled.main`
  display: flex;
  flex: 1;

  justify-content: center;
  align-items: center;

  & > form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`;

export const BaseCountdownButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem;
  border-radius: 8px;

  font-weight: 700;
  transition: background-color 200ms;
`;

export const StartCountdownButton = styled(BaseCountdownButton)`
  color: ${(props) => props.theme['gray-100']};
  background-color: ${(props) => props.theme['green-500']};

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['green-700']};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const StopCountdownButton = styled(BaseCountdownButton)`
  color: ${(props) => props.theme.white};
  background-color: ${(props) => props.theme['red-500']};

  &:hover {
    background-color: ${(props) => props.theme['red-700']};
  }
`;
