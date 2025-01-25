import { useContext, useEffect } from 'react';
import { CountdownContainer, Separator } from './style';
import { differenceInSeconds } from 'date-fns';
import { CyclesContext } from '../../../../contexts/CyclesContext';

export function Countdown() {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountOfSecondsPassed,
    setSecondsPassed,
  } = useContext(CyclesContext);

  const totalSecondsAmount = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  useEffect(() => {
    let interval: number;

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDiff = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        );

        if (secondsDiff >= totalSecondsAmount) {
          markCurrentCycleAsFinished();
          setSecondsPassed(totalSecondsAmount);
          clearInterval(interval);
        } else {
          setSecondsPassed(secondsDiff);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [
    activeCycle,
    totalSecondsAmount,
    activeCycleId,
    markCurrentCycleAsFinished,
    setSecondsPassed,
  ]);

  const currentSecondsAmount = activeCycle
    ? totalSecondsAmount - amountOfSecondsPassed
    : 0;

  const minutesAmount = Math.floor(currentSecondsAmount / 60);
  const secondsAmount = currentSecondsAmount % 60;

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  );
}
