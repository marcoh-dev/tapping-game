import { useRef, useEffect, useState } from "react";
import { StyledGameTarget } from "../GameLogic/GameLogic.styled";
import {
  StyledHeader,
  StyledHeaderGameArea,
  StyledHeadline,
} from "./Header.styled";
import { createFixedPositionTarget, getScale } from "@/utils/gameHelper";

export default function Header() {
  const gameAreaRef = useRef(null);
  const [targets, setTargets] = useState([]);
  const [allTargetsClicked, setAllTargetsClicked] = useState(false);

  useEffect(() => {
    const gameArea = gameAreaRef.current;
    if (!gameArea) {
      return;
    }

    const targetPercentagePositions = [
      { top: 3, left: 12 },
      { top: 55, left: 5 },
      { top: 12, left: 70 },
      { top: 70, left: 75 },
    ];

    const { width: gameAreaWidth, height: gameAreaHeight } =
      gameArea.getBoundingClientRect();
    const gameAreaScale = getScale(gameAreaWidth, gameAreaHeight);

    const initialTargets = [];

    for (let i = 0; i < targetPercentagePositions.length; i++) {
      initialTargets.push(
        createFixedPositionTarget(
          initialTargets,
          gameAreaWidth,
          gameAreaHeight,
          gameAreaScale,
          targetPercentagePositions[i]
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

  useEffect(() => {
    if (targets.length > 0 && targets.every((target) => target.removing)) {
      setAllTargetsClicked(true);
    } else {
      setAllTargetsClicked(false);
    }
  }, [targets]);

  function handleClick(id) {
    setTargets((prev) =>
      prev.map((target) =>
        target.id === id ? { ...target, removing: true } : target
      )
    );
  }

  return (
    <StyledHeader>
      <StyledHeaderGameArea ref={gameAreaRef}>
        <>
          <StyledHeadline $allTargetsClicked={allTargetsClicked}>
            tapping
            <br />
            game
          </StyledHeadline>
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
        </>
      </StyledHeaderGameArea>
    </StyledHeader>
  );
}
