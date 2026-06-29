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

export default function Game({ mode, isSignedIn }) {
  const [isCountdown, setIsCountdown] = useState(true);
  const [resetCountdown, setResetCountdown] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameMenuOpen, setIsGameMenuOpen] = useState(false);
  const [databaseHighscore, setDatabaseHighscore] = useState(0);
  const [localScoreHistory, setLocalScoreHistory] = useLocalStorageState(
    "localScoreHistory",
    {
      defaultValue: [],
    }
  );
  const [score, setScore] = useState(0);
  const localHighscore = Math.max(
    0,
    ...localScoreHistory
      .filter(
        (historyEntry) =>
          historyEntry.isHighscore && historyEntry.mode === mode.id
      )
      .map((historyEntry) => historyEntry.score)
  );

  const highscore = isSignedIn ? databaseHighscore : localHighscore;

  async function getHighscore() {
    try {
      const response = await fetch(`/api/scores/best?mode=${mode.id}`);
      const data = await response.json();
      setDatabaseHighscore(data?.score ?? 0);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (!isSignedIn) return;

    getHighscore();
  }, [isSignedIn, databaseHighscore, highscore]);

  const [displayedHighscore, setDisplayedHighscore] = useState(0);

  function handleTargetClick(increment) {
    setScore((prev) => prev + increment);
  }

  function handleCountdownComplete() {
    setIsCountdown(false);
  }

  async function handleGameOver() {
    setIsGameMenuOpen(false);
    if (score > 0) {
      const isHighscoreBeaten = score > highscore;
      if (isHighscoreBeaten) {
        setDatabaseHighscore();
      }

      if (isSignedIn) {
        const result = await handleScoreCreate({
          score,
          mode: mode.id,
          isHighscore: isHighscoreBeaten,
        });
      } else {
        setLocalScoreHistory((prev) => [
          ...prev,
          {
            score,
            mode: mode.id,
            timestamp: Date.now(),
            isHighscore: isHighscoreBeaten,
          },
        ]);
      }
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

  async function handleScoreCreate({ score, mode, isHighscore }) {
    try {
      const response = await fetch("/api/scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          score,
          mode,
          isHighscore,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save score");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("saveScore error:", error);
      return null;
    }
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
            <GameScore mode={mode} score={score} />
            <GameTimer
              mode={mode}
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
        {isGameMenuOpen && (
          <GameMenu mode={mode} onGameRestart={handleGameRestart} />
        )}
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
