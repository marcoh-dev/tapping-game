import type { GameMode } from "@/types/game";

import { StyledGameScoreSection } from "./GameScore.styled";

type GameScoreProps = {
	mode: GameMode;
	score?: number;
};

export default function GameScore({ mode, score = 0 }: GameScoreProps) {
	return (
		<StyledGameScoreSection>
			<span>
				score: {score}
				{mode.type === "points" && `/${mode.points}`}
			</span>
		</StyledGameScoreSection>
	);
}
