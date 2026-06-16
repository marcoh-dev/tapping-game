import { useRef, useEffect, useState } from "react";
import { StyledGameArea, StyledGameTarget } from "./GameLogic.styled";
import { createTarget, getScale } from "@/utils/gameHelper";

export default function GameLogic({ onTargetClick, isGameOver }) {
  const gameAreaRef = useRef(null);
  const targetCount = 3;
  const [targets, setTargets] = useState([]);

  useEffect(() => {
    const gameArea = gameAreaRef.current;
    if (!gameArea) {
      return;
    }

    const { width: gameAreaWidth, height: gameAreaHeight } =
      gameArea.getBoundingClientRect();
    const gameAreaScale = getScale(gameAreaWidth, gameAreaHeight);

    const initialTargets = [];

    for (let i = 0; i < targetCount; i++) {
      initialTargets.push(
        createTarget(
          initialTargets,
          gameAreaWidth,
          gameAreaHeight,
          gameAreaScale
        )
      );
    }

    setTargets(initialTargets);

    requestAnimationFrame(() => {
      setTargets((prev) =>
        prev.map((target) => ({ ...target, removing: false }))
      );
    });
  }, []);

  function handleClick(id) {
    if (isGameOver) return;

    const gameArea = gameAreaRef.current;
    if (!gameArea) {
      return;
    }

    const { width: gameAreaWidth, height: gameAreaHeight } =
      gameArea.getBoundingClientRect();
    const gameAreaScale = getScale(gameAreaWidth, gameAreaHeight);

    setTargets((prev) => {
      const filteredTargets = prev.filter((target) => target.id !== id);

      const newTarget = createTarget(
        filteredTargets,
        gameAreaWidth,
        gameAreaHeight,
        gameAreaScale
      );

      const next = [...filteredTargets, newTarget];

      return next.map((target) =>
        target.id === newTarget.id ? { ...target, removing: true } : target
      );
    });

    onTargetClick(1);

    requestAnimationFrame(() => {
      setTargets((prev) =>
        prev.map((target) => ({ ...target, removing: false }))
      );
    });
  }

  return (
    <StyledGameArea ref={gameAreaRef}>
      {targets.map((target) => (
        <StyledGameTarget
          key={target.id}
          $isHidden={target.removing}
          onClick={() => handleClick(target.id)}
          aria-label="target"
          disabled={isGameOver}
          style={{
            left: target.left,
            top: target.top,
            width: target.size,
            height: target.size,
          }}
        />
      ))}
    </StyledGameArea>
  );
}
