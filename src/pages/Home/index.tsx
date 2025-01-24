import { HandPalm, Play } from 'phosphor-react';
import {
  HomeContainer,
  FormContainer,
  CountdownContainer,
  Separator,
  StartCountdownButton,
  TaskInput,
  MinutesAmountInput,
  StopCountdownButton,
} from './styles';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEffect, useState } from 'react';
import { differenceInSeconds } from 'date-fns';

const newCycleFormSchema = z.object({
  task: z.string().min(1, 'Informe uma tarefa válida'),
  minutesAmount: z
    .number()
    .min(1, { message: 'O ciclo precisa ter pelo menos 5 minutos' })
    .max(60, { message: 'O ciclo não pode ter mais que 60 minutos' }),
});

type newCycleFormData = z.infer<typeof newCycleFormSchema>;

interface Cycle {
  id: string;
  task: string;
  minutesAmount: number;
  startDate: Date;
  interruptedDate?: Date;
  finishedDate?: Date;
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
  const [amountOfSecondsPassed, setAmountOfSecondsPassed] = useState(0);

  const { register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: '',
      minutesAmount: 5,
    },
  });

  function handleCreateNewCycle({ task, minutesAmount }: newCycleFormData) {
    const id = String(new Date().getTime());

    const newCycle: Cycle = {
      id,
      task,
      minutesAmount,
      startDate: new Date(),
    };

    setCycles((state) => [...state, newCycle]);
    setActiveCycleId(id);
    setAmountOfSecondsPassed(0);

    reset();
  }

  function handleInterruptCycle() {
    setCycles(
      cycles.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() };
        }

        return cycle;
      })
    );

    setActiveCycleId(null);
    document.title = 'Ignite Timer | Home';
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
  const totalSecondsAmount = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDiff = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (secondsDiff >= totalSecondsAmount) {
          setCycles((state) => {
            return state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() };
              }

              return cycle;
            });
          });

          setAmountOfSecondsPassed(totalSecondsAmount);
          clearInterval(interval);
        } else {
          setAmountOfSecondsPassed(secondsDiff);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, totalSecondsAmount, activeCycleId]);

  const currentSecondsAmount = activeCycle
    ? totalSecondsAmount - amountOfSecondsPassed
    : 0;

  const minutesAmount = Math.floor(currentSecondsAmount / 60);
  const secondsAmount = currentSecondsAmount % 60;

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  const task = watch('task');
  const isSubmitButtonDisabled = !task;

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

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
            disabled={!!activeCycle}
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
            min={1}
            max={60}
            step={5}
            disabled={!!activeCycle}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm width={20} height={24} />
            interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton
            type="submit"
            form="taskForm"
            disabled={isSubmitButtonDisabled}
          >
            <Play width={20} height={24} />
            Começar
          </StartCountdownButton>
        )}
      </div>
    </HomeContainer>
  );
}
