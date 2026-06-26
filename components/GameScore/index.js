import { StyledGameScoreSection } from "./GameScore.styled";

export default function GameScore({ mode, score = 0 }) {
  return (
    <StyledGameScoreSection>
      <span>
        score: {score}
        {mode.type === "points" && `/${mode.points}`}
      </span>
    </StyledGameScoreSection>
  );
}
