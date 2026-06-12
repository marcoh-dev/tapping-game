import { useState, useEffect } from "react";
import {
  StyledGameCountdown,
  StyledGameCountdownWrap,
} from "./GameCountdown.styled";

export default function GameCountdown({ startFrom = 3, setIsCountdown }) {
  const [countdown, setCountdown] = useState(startFrom);
  useEffect(() => {
    if (countdown > 0) {
      const countdownTimer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(countdownTimer);
    } else {
      setIsCountdown(false);
    }
  }, [countdown, setIsCountdown]);

  return (
    <StyledGameCountdownWrap>
      <StyledGameCountdown>{countdown > 0 ? countdown : 1}</StyledGameCountdown>
    </StyledGameCountdownWrap>
  );
}
