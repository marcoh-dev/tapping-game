import {
  StyledButton,
  StyledButtons,
  StyledButtonSection,
} from "../global/Buttons.styled";
import {
  StyledGameOverWrap,
  StyledGameOverSection,
  StyledGameOverHeadline,
  StyledGameOverScore,
} from "./GameOver.styled";

export default function GameOver({
  score,
  highscore,
  onGameRestart,
  isHighscoreBeaten,
}) {
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
      <StyledButtonSection>
        <StyledButtons>
          <StyledButton type="button" onClick={onGameRestart}>
            Try again
          </StyledButton>
        </StyledButtons>
      </StyledButtonSection>
    </StyledGameOverWrap>
  );
}
