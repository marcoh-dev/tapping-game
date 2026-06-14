import { useRef, useEffect, useState } from "react";
import { StyledGameArea, StyledGameTarget } from "./GameLogic.styled";

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function getScale(width, height) {
  const unit = Math.min(width, height);

  return {
    gap: unit * 0.05,
    minSize: unit * 0.1,
    maxSize: unit * 0.25,
  };
}

function isOverlapping(a, b, gap) {
  return !(
    a.left + a.size + gap < b.left ||
    a.left > b.left + b.size + gap ||
    a.top + a.size + gap < b.top ||
    a.top > b.top + b.size + gap
  );
}

function createTarget(
  existingTargets,
  gameAreaWidth,
  gameAreaHeight,
  gameAreaScale
) {
  for (let i = 0; i < 100; i++) {
    const targetSize =
      Math.random() * (gameAreaScale.maxSize - gameAreaScale.minSize) +
      gameAreaScale.minSize;

    const potentialNewTarget = {
      id: crypto.randomUUID(),
      left: random(0, gameAreaWidth - targetSize),
      top: random(0, gameAreaHeight - targetSize),
      size: targetSize,
      removing: true,
    };

    const overlap = existingTargets.some((target) =>
      isOverlapping(potentialNewTarget, target, gameAreaScale.gap)
    );

    if (!overlap) return potentialNewTarget;
  }

  throw new Error("No valid position found");
}

export default function GameLogic({ onTargetClick, isGameover }) {
  const ref = useRef(null);
  const targetCount = 3;
  const [targets, setTargets] = useState([]);

  useEffect(() => {
    const gameArea = ref.current;
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
    if (isGameover) return;

    const gameArea = ref.current;
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
    <StyledGameArea ref={ref}>
      {targets.map((target) => (
        <StyledGameTarget
          key={target.id}
          $isHidden={target.removing}
          onClick={() => handleClick(target.id)}
          aria-label="target"
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
