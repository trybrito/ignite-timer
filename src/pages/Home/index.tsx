import { Play } from 'phosphor-react';
import {
  HomeContainer,
  FormContainer,
  CountdownContainer,
  Separator,
  StartCountdownButton,
  TaskInput,
  MinutesAmountInput,
} from './styles';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const newCycleFormSchema = z.object({
  task: z.string().min(1, 'Informe uma tarefa válida'),
  minutesAmount: z
    .number()
    .min(5, { message: 'O ciclo precisa ter pelo menos 5 minutos' })
    .max(60, { message: 'O ciclo não pode ter mais que 60 minutos' }),
});

type newCycleFormData = z.infer<typeof newCycleFormSchema>;

export function Home() {
  const { register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: '',
      minutesAmount: 5,
    },
  });

  function handleCreateNewCycle(data: newCycleFormData) {
    console.log(data);
    reset();
  }

  const task = watch('task');
  const isSubmitButtonDisabled = !task;

  return (
    <HomeContainer>
      <div>
        <FormContainer
          action="#"
          id="taskForm"
          onSubmit={handleSubmit(handleCreateNewCycle)}
        >
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            type="text"
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            min={5}
            max={60}
            step={5}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton
          type="submit"
          form="taskForm"
          disabled={isSubmitButtonDisabled}
        >
          <Play width={20} height={24} />
          Começar
        </StartCountdownButton>
      </div>
    </HomeContainer>
  );
}
