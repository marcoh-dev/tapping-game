import { useEffect, useState } from "react";
import {
  StyledGameTimerSection,
  StyledGameTimerSecond,
} from "./GameTimer.styled";

export default function GameTimer({
  mode,
  isCountdown,
  isGameover,
  onTimerComplete,
}) {
  const isInfinite = mode.type === "points";
  const duration = mode.time;

  const [time, setTime] = useState(isInfinite ? 0 : duration * 1000);

  useEffect(() => {
    setTime(isInfinite ? 0 : duration * 1000);
  }, [isInfinite, duration]);

  useEffect(() => {
    if (isCountdown || isGameover) return;

    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const interval = setInterval(() => {
      if (isInfinite) {
        setTime(Date.now() - startTime);
      } else {
        const remainingTime = Math.max(0, endTime - Date.now());

        setTime(remainingTime);

        if (remainingTime === 0) {
          clearInterval(interval);
          onTimerComplete(true);
        }
      }
    }, 32);

    return () => clearInterval(interval);
  }, [duration, isInfinite, isCountdown, isGameover, onTimerComplete]);

  const seconds = Math.floor(time / 1000);
  const milliseconds = time % 1000;

  return (
    <StyledGameTimerSection $isLastFiveSeconds={!isInfinite && time <= 5000}>
      {isCountdown ? (
        <span>
          <StyledGameTimerSecond>{duration}</StyledGameTimerSecond>
        </span>
      ) : (
        <span>
          <StyledGameTimerSecond>{seconds}</StyledGameTimerSecond>,
          {milliseconds.toString().padStart(3, "0")}
        </span>
      )}
    </StyledGameTimerSection>
  );
}
