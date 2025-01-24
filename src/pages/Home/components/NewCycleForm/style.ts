import styled from 'styled-components';

export const FormContainer = styled.div`
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
