import { HandPalm, Play } from 'phosphor-react';
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';
import { useContext } from 'react';
import { CyclesContext } from '../../contexts/CyclesContext';

const newCycleFormSchema = z.object({
  task: z.string().min(1, 'Informe uma tarefa válida'),
  minutesAmount: z
    .number()
    .min(5, { message: 'O ciclo precisa ter pelo menos 5 minutos' })
    .max(60, { message: 'O ciclo não pode ter mais que 60 minutos' }),
});

type newCycleFormData = z.infer<typeof newCycleFormSchema>;

export function Home() {
  const { activeCycle, interruptCurrentCycle, createNewCycle } =
    useContext(CyclesContext);

  const newCycleForm = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: '',
      minutesAmount: 5,
    },
  });

  const { watch, handleSubmit, reset } = newCycleForm;

  function handleCreateNewCycle(data: newCycleFormData) {
    createNewCycle(data);
    reset();
  }

  const task = watch('task');
  const isSubmitButtonDisabled = !task;

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>

        <Countdown />

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={interruptCurrentCycle}>
            <HandPalm width={20} height={24} />
            interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitButtonDisabled}>
            <Play width={20} height={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
