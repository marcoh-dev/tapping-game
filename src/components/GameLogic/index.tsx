import { useEffect, useRef, useState } from "react";

import type { Target } from "@/types/game";
import { createTarget, getScale } from "@/utils/gameHelper";

import { StyledGameArea, StyledGameTarget } from "./GameLogic.styled";

type GameLogicProps = {
	onTargetClick: (increment: number) => void;
	isGameMenuOpen: boolean;
	isGameOver: boolean;
};

export default function GameLogic({ onTargetClick, isGameMenuOpen, isGameOver }: GameLogicProps) {
	const gameAreaRef = useRef<HTMLElement>(null);
	const targetCount = 3;
	const [targets, setTargets] = useState<Target[]>([]);

	useEffect(() => {
		const gameArea = gameAreaRef.current;
		if (!gameArea) {
			return;
		}

		const { width: gameAreaWidth, height: gameAreaHeight } = gameArea.getBoundingClientRect();
		const gameAreaScale = getScale(gameAreaWidth, gameAreaHeight);

		const initialTargets: Target[] = [];

		for (let i = 0; i < targetCount; i++) {
			initialTargets.push(
				createTarget(initialTargets, gameAreaWidth, gameAreaHeight, gameAreaScale),
			);
		}

		setTargets(initialTargets);

		requestAnimationFrame(() => {
			setTargets((prev) => prev.map((target) => ({ ...target, removing: false })));
		});
	}, []);

	function handleClick(id: string) {
		if (isGameOver || isGameMenuOpen) return;

		const gameArea = gameAreaRef.current;
		if (!gameArea) {
			return;
		}

		const { width: gameAreaWidth, height: gameAreaHeight } = gameArea.getBoundingClientRect();
		const gameAreaScale = getScale(gameAreaWidth, gameAreaHeight);

		setTargets((prev) => {
			const filteredTargets = prev.filter((target) => target.id !== id);

			const newTarget = createTarget(
				filteredTargets,
				gameAreaWidth,
				gameAreaHeight,
				gameAreaScale,
			);

			const next = [...filteredTargets, newTarget];

			return next.map((target) =>
				target.id === newTarget.id ? { ...target, removing: true } : target,
			);
		});

		onTargetClick(1);

		requestAnimationFrame(() => {
			setTargets((prev) => prev.map((target) => ({ ...target, removing: false })));
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
					disabled={isGameOver || isGameMenuOpen}
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
