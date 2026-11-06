import { useEffect, useState } from "react";
import useLocalStorageState from "use-local-storage-state";

import GameCountdown from "@/components/GameCountdown";
import GameLogic from "@/components/GameLogic";
import GameMenu from "@/components/GameMenu";
import { StyledGameMenuButton } from "@/components/GameMenu/GameMenu.styled";
import GameOver from "@/components/GameOver";
import GameScore from "@/components/GameScore";
import GameTimer from "@/components/GameTimer";
import MenuCloseIcon from "@/icons/menu-close.svg";
import MenuOpenIcon from "@/icons/menu-open.svg";
import type { BestScore } from "@/types/api";
import type { GameMode, LocalScoreEntry } from "@/types/game";

import { StyledGameBody, StyledGameHeader, StyledGameWrap } from "./Game.styled";

type GameProps = {
	mode: GameMode;
	isSignedIn: boolean;
};

export default function Game({ mode, isSignedIn }: GameProps) {
	const [isCountdown, setIsCountdown] = useState(true);
	const [resetCountdown, setResetCountdown] = useState(0);
	const [isGameOver, setIsGameOver] = useState(false);
	const [isGameMenuOpen, setIsGameMenuOpen] = useState(false);
	const [databaseHighscore, setDatabaseHighscore] = useState(0);
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

	useEffect(() => {
		if (!isSignedIn) return;

		async function getHighscore() {
			try {
				const response = await fetch(`/api/scores/best?mode=${mode.id}`);
				const data = (await response.json()) as BestScore;
				setDatabaseHighscore(data?.score ?? 0);
			} catch (error) {
				console.error(error);
			}
		}

		getHighscore();
	}, [isSignedIn, mode.id]);

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
				const result = await handleScoreCreate({
					score,
					mode: mode.id,
					isHighscore: isHighscoreBeaten,
				});
				if (result && isHighscoreBeaten) {
					setDatabaseHighscore(score);
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
		setIsHighscoreBeaten(false);
		setScore(0);
	}

	async function handleScoreCreate({
		score,
		mode,
		isHighscore,
	}: {
		score: number;
		mode: string;
		isHighscore: boolean;
	}) {
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

			return (await response.json()) as { _id: string };
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
