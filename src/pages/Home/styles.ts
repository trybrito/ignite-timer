import styled from 'styled-components';

export const HomeContainer = styled.main`
  display: flex;
  flex: 1;

  justify-content: center;
  align-items: center;

  & > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.5rem;
  }
`;

export const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
  width: 100%;

  font-size: 1.125rem;
  font-weight: 700;
  line-height: 1.6;
  color: ${(props) => props.theme['gray-100']};
`;

const BaseInput = styled.input`
  padding: 0.75rem 0.5rem;
  background: transparent;
  border-bottom: 2px solid ${(props) => props.theme['gray-500']};
  font-size: inherit;
  font-weight: 700;
  color: inherit;

  &::placeholder {
    color: ${(props) => props.theme['gray-500']};
  }

  &:focus {
    box-shadow: none;
    border-bottom: 2px solid ${(props) => props.theme['green-500']};
  }
`;

export const TaskInput = styled(BaseInput)`
  flex: 1;

  &::-webkit-calendar-picker-indicator {
    display: none !important;
  }
`;

export const MinutesAmountInput = styled(BaseInput)`
  width: 4rem;
`;

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

export const StartCountdownButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 1rem;
  border-radius: 8px;

  font-weight: 700;
  color: ${(props) => props.theme['gray-100']};
  background-color: ${(props) => props.theme['green-500']};
  transition: background-color 200ms;

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme['green-700']};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
