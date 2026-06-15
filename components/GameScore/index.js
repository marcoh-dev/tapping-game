import { StyledGameScoreSection } from "./GameScore.styled";

export default function GameScore({ score = 0 }) {
  return (
    <StyledGameScoreSection>
      <span>score: {score}</span>
    </StyledGameScoreSection>
  );
}
