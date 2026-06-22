import GameScore from "../GameScore";
import GameTimer from "../GameTimer";
import GameLogic from "../GameLogic";
import GameCountdown from "../GameCountdown";
import { useState, useEffect } from "react";
import {
  StyledGameBody,
  StyledGameHeader,
  StyledGameWrap,
} from "./Game.styled";
import GameOver from "../GameOver";
import useLocalStorageState from "use-local-storage-state";
import { StyledGameMenuButton } from "../GameMenu/GameMenu.styled";
import GameMenu from "../GameMenu";
import MenuOpenIcon from "@/icons/menu-open.svg";
import MenuCloseIcon from "@/icons/menu-close.svg";

export default function Game() {
  const [isCountdown, setIsCountdown] = useState(true);
  const [resetCountdown, setResetCountdown] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameMenuOpen, setIsGameMenuOpen] = useState(false);
  const [scoreHistory, setScoreHistory] = useLocalStorageState("scoreHistory", {
    defaultValue: [],
  });
  const [score, setScore] = useState(0);
  const highscore = Math.max(
    0,
    ...scoreHistory
      .filter((historyEntry) => historyEntry.isHighscore)
      .map((historyEntry) => historyEntry.score)
  );

  const [displayedHighscore, setDisplayedHighscore] = useState(null);

  useEffect(() => {
    if (displayedHighscore === null) {
      setDisplayedHighscore(highscore);
    }
  }, [highscore, displayedHighscore]);

  function handleTargetClick(increment) {
    setScore((prev) => prev + increment);
  }

  function handleCountdownComplete() {
    setIsCountdown(false);
  }

  function handleGameOver() {
    setIsGameMenuOpen(false);
    if (score > 0) {
      const isHighscoreBeaten = score > highscore;
      setScoreHistory((prev) => [
        ...prev,
        {
          score,
          timestamp: Date.now(),
          isHighscore: isHighscoreBeaten,
        },
      ]);
    }
  }

  useEffect(() => {
    if (isGameOver) {
      handleGameOver();
    }
  }, [isGameOver]);

  function handleGameRestart() {
    setResetCountdown((prev) => prev + 1);
    setIsCountdown(true);
    setIsGameMenuOpen(false);
    setIsGameOver(false);
    setDisplayedHighscore(highscore);
    setScore(0);
  }

  return (
    <StyledGameWrap>
      <StyledGameHeader $isGameOver={isGameOver}>
        {isGameOver ? (
          <>
            <h1>Game over</h1>
          </>
        ) : (
          <>
            <GameScore score={score} />
            <GameTimer
              duration={30}
              isCountdown={isCountdown}
              isGameOver={isGameOver}
              onTimerComplete={setIsGameOver}
            />
            <StyledGameMenuButton
              onClick={() => setIsGameMenuOpen(!isGameMenuOpen)}
              aria-label={isGameMenuOpen ? "Close Game Menu" : "Open Game Menu"}
            >
              {isGameMenuOpen ? <MenuCloseIcon /> : <MenuOpenIcon />}
            </StyledGameMenuButton>
          </>
        )}
      </StyledGameHeader>
      <StyledGameBody>
        {isCountdown && (
          <GameCountdown
            startFrom={3}
            resetCountdown={resetCountdown}
            onCountdownComplete={handleCountdownComplete}
          />
        )}
        {!isCountdown && (
          <GameLogic
            onTargetClick={handleTargetClick}
            isGameOver={isGameOver}
            isGameMenuOpen={isGameMenuOpen}
          />
        )}
        {isGameMenuOpen && <GameMenu onGameRestart={handleGameRestart} />}
        {isGameOver && (
          <GameOver
            score={score}
            highscore={highscore}
            onGameRestart={handleGameRestart}
            isHighscoreBeaten={score > displayedHighscore}
          />
        )}
      </StyledGameBody>
    </StyledGameWrap>
  );
}
