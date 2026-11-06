"use client";

import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";

import { saveScore } from "@/app/actions";
import GameCountdown from "@/components/GameCountdown";
import GameLogic from "@/components/GameLogic";
import GameMenu from "@/components/GameMenu";
import { StyledGameMenuButton } from "@/components/GameMenu/GameMenu.styled";
import GameOver from "@/components/GameOver";
import GameScore from "@/components/GameScore";
import GameTimer from "@/components/GameTimer";
import MenuCloseIcon from "@/icons/menu-close.svg";
import MenuOpenIcon from "@/icons/menu-open.svg";
import type { GameMode, LocalScoreEntry } from "@/types/game";

import { StyledGameBody, StyledGameHeader, StyledGameWrap } from "./Game.styled";

type GameProps = {
	mode: GameMode;
	isSignedIn: boolean;
	initialHighscore: number;
};

export default function Game({ mode, isSignedIn, initialHighscore }: GameProps) {
	const [isCountdown, setIsCountdown] = useState(true);
	const [resetCountdown, setResetCountdown] = useState(0);
	const [isGameOver, setIsGameOver] = useState(false);
	const [isGameMenuOpen, setIsGameMenuOpen] = useState(false);
	const [databaseHighscore, setDatabaseHighscore] = useState(initialHighscore);
	const [isHighscoreBeaten, setIsHighscoreBeaten] = useState(false);
	const [localScoreHistory, setLocalScoreHistory] = useLocalStorageState<LocalScoreEntry[]>(
		"localScoreHistory",
		{
			defaultValue: [],
		},
	);
	const [score, setScore] = useState(0);
	const localHighscore = Math.max(
		0,
		...localScoreHistory
			.filter((historyEntry) => historyEntry.isHighscore && historyEntry.mode === mode.id)
			.map((historyEntry) => historyEntry.score),
	);

	const highscore = isSignedIn ? databaseHighscore : localHighscore;

	function handleTargetClick(increment: number) {
		setScore((prev) => prev + increment);
	}

	function handleCountdownComplete() {
		setIsCountdown(false);
	}

	async function handleGameOver() {
		setIsGameMenuOpen(false);
		if (score > 0) {
			const isHighscoreBeaten = score > highscore;
			setIsHighscoreBeaten(isHighscoreBeaten);

			if (isSignedIn) {
				try {
					const result = await saveScore(score, mode.id);

					if (!result.ok) {
						console.error("saveScore error:", result.status);
					} else if (result.isHighscore) {
						setDatabaseHighscore(score);
					}
				} catch (error) {
					console.error("saveScore error:", error);
				}
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

	function handleTimerComplete() {
		setIsGameOver(true);
		void handleGameOver();
	}

	function handleGameRestart() {
		setResetCountdown((prev) => prev + 1);
		setIsCountdown(true);
		setIsGameMenuOpen(false);
		setIsGameOver(false);
		setIsHighscoreBeaten(false);
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
						<GameScore mode={mode} score={score} />
						<GameTimer
							key={resetCountdown}
							mode={mode}
							isCountdown={isCountdown}
							isGameOver={isGameOver}
							onTimerComplete={handleTimerComplete}
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
						key={resetCountdown}
						startFrom={3}
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
				{isGameMenuOpen && <GameMenu mode={mode} onGameRestart={handleGameRestart} />}
				{isGameOver && (
					<GameOver
						score={score}
						highscore={highscore}
						onGameRestart={handleGameRestart}
						isHighscoreBeaten={isHighscoreBeaten}
					/>
				)}
			</StyledGameBody>
		</StyledGameWrap>
	);
}
