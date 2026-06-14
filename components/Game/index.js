import GameScore from "../GameScore";
import GameTimer from "../GameTimer";
import GameLogic from "../GameLogic";
import GameCountdown from "../GameCountdown";
import { useState } from "react";
import {
  StyledGameBody,
  StyledGameHeader,
  StyledGameWrap,
} from "./Game.styled";

export default function Game() {
  const [isCountdown, setIsCountdown] = useState(true);
  const [isGameover, setIsGameover] = useState(false);
  const [score, setScore] = useState(0);

  function handleTargetClick(increment) {
    setScore((prev) => prev + increment);
  }

  function handleCountdownComplete() {
    setIsCountdown(false);
  }

  return (
    <StyledGameWrap>
      <StyledGameHeader>
        <GameScore score={score} />
        <GameTimer
          duration={30}
          isCountdown={isCountdown}
          isGameover={isGameover}
          onTimerComplete={setIsGameover}
        />
      </StyledGameHeader>
      <StyledGameBody>
        {isCountdown && (
          <GameCountdown
            startFrom={3}
            onCountdownComplete={handleCountdownComplete}
          />
        )}
        {!isCountdown && (
          <GameLogic
            onTargetClick={handleTargetClick}
            isGameover={isGameover}
          />
        )}
      </StyledGameBody>
    </StyledGameWrap>
  );
}
