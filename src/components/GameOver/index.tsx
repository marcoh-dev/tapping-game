import Link from "next/link";

import {
	StyledButtonGreen,
	StyledButtonRed,
	StyledButtons,
	StyledButtonSection,
} from "@/components/global/Buttons.styled";

import {
	StyledGameOverHeadline,
	StyledGameOverScore,
	StyledGameOverSection,
	StyledGameOverWrap,
} from "./GameOver.styled";

type GameOverProps = {
	score: number;
	highscore: number;
	onGameRestart: () => void;
	isHighscoreBeaten: boolean;
};

export default function GameOver({
	score,
	highscore,
	onGameRestart,
	isHighscoreBeaten,
}: GameOverProps) {
	return (
		<StyledGameOverWrap>
			<StyledGameOverSection>
				<StyledGameOverHeadline>Your Score</StyledGameOverHeadline>
				<StyledGameOverScore $isHighscoreBeaten={isHighscoreBeaten}>
					{score}
				</StyledGameOverScore>
			</StyledGameOverSection>
			{isHighscoreBeaten ? (
				<StyledGameOverSection>
					<StyledGameOverHeadline $isHighscoreBeaten={isHighscoreBeaten}>
						New Highscore!
					</StyledGameOverHeadline>
				</StyledGameOverSection>
			) : (
				highscore > 0 && (
					<StyledGameOverSection>
						<StyledGameOverHeadline>Your Highscore</StyledGameOverHeadline>
						<StyledGameOverScore>{highscore}</StyledGameOverScore>
					</StyledGameOverSection>
				)
			)}
			<StyledButtonSection $alignBottom>
				<StyledButtons>
					<StyledButtonGreen type="button" onClick={onGameRestart}>
						Try again
					</StyledButtonGreen>
					<StyledButtonRed as={Link} href="/">
						Quit
					</StyledButtonRed>
				</StyledButtons>
			</StyledButtonSection>
		</StyledGameOverWrap>
	);
}
