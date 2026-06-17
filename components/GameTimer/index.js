import { useState, useEffect } from "react";
import {
  StyledGameTimerSection,
  StyledGameTimerSecond,
} from "./GameTimer.styled";

export default function GameTimer({
  duration = 30,
  isCountdown,
  isGameover,
  onTimerComplete,
}) {
  const [timeLeft, setTimeLeft] = useState(duration * 1000);

  useEffect(() => {
    if (!isCountdown && !isGameover) {
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
  }, [duration, onTimerComplete, isCountdown, isGameover]);

  const seconds = Math.floor(timeLeft / 1000);
  const milliseconds = timeLeft % 1000;

  return (
    <StyledGameTimerSection $isLastFiveSeconds={timeLeft <= 5000}>
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
