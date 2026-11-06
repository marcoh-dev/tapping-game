"use client";

import { useEffect, useRef, useState } from "react";

import { StyledGameTarget } from "@/components/GameLogic/GameLogic.styled";
import type { Target } from "@/types/game";
import { createFixedPositionTarget, getScale } from "@/utils/gameHelper";

import { StyledHeader, StyledHeaderGameArea, StyledHeadline } from "./Header.styled";

export default function Header() {
	const gameAreaRef = useRef<HTMLElement>(null);
	const [targets, setTargets] = useState<Target[]>([]);

	useEffect(() => {
		const gameArea = gameAreaRef.current;
		if (!gameArea) {
			return;
		}

		const targetPositionsInPercent = [
			{ top: 3, left: 12 },
			{ top: 55, left: 5 },
			{ top: 12, left: 70 },
			{ top: 70, left: 75 },
		];

		const { width: gameAreaWidth, height: gameAreaHeight } = gameArea.getBoundingClientRect();
		const gameAreaScale = getScale(gameAreaWidth, gameAreaHeight);

		const initialTargets: Target[] = [];

		for (const positionInPercent of targetPositionsInPercent) {
			initialTargets.push(
				createFixedPositionTarget(
					initialTargets,
					gameAreaWidth,
					gameAreaHeight,
					gameAreaScale,
					positionInPercent,
				),
			);
		}

		setTargets(initialTargets);

		requestAnimationFrame(() => {
			setTargets((prev) => prev.map((target) => ({ ...target, removing: false })));
		});
	}, []);

	const allTargetsClicked = targets.length > 0 && targets.every((target) => target.removing);

	function handleClick(id: string) {
		setTargets((prev) =>
			prev.map((target) => (target.id === id ? { ...target, removing: true } : target)),
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
