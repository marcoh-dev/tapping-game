import { useState, useEffect } from "react";
import {
  StyledGameTimerSection,
  StyledGameTimerSecond,
} from "./GameTimer.styled";

export default function GameTimer({
  duration = 30,
  isCountdown,
  isGameOver,
  onTimerComplete,
}) {
  const [timeLeft, setTimeLeft] = useState(duration * 1000);

  useEffect(() => {
    if (!isCountdown && !isGameOver) {
      const endTime = Date.now() + duration * 1000;

      const interval = setInterval(() => {
        const remainingTime = Math.max(0, endTime - Date.now());

        setTimeLeft(remainingTime);

        if (remainingTime === 0) {
          clearInterval(interval);
          onTimerComplete(true);
        }
      }, 32);

      return () => clearInterval(interval);
    }
  }, [duration, onTimerComplete, isCountdown, isGameOver]);

  const seconds = Math.floor(timeLeft / 1000);
  const milliseconds = timeLeft % 1000;

  return (
    <StyledGameTimerSection $isLastFiveSeconds={timeLeft <= 5000}>
      <span>
        <StyledGameTimerSecond>{seconds}</StyledGameTimerSecond>
        {!isCountdown && <>,{milliseconds.toString().padStart(3, "0")}</>}
      </span>
    </StyledGameTimerSection>
  );
}
