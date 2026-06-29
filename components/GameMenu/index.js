import {
  StyledButtonYellow,
  StyledButtonRed,
  StyledButtons,
  StyledButtonSection,
} from "../global/Buttons.styled";
import {
  StyledGameMenuWrap,
  StyledGameMenuSection,
  StyledGameMenuHeadline,
} from "./GameMenu.styled";
import Link from "next/link";

export default function GameMenu({ mode, onGameRestart }) {
  return (
    <StyledGameMenuWrap>
      <StyledGameMenuSection>
        <p>Game Mode</p>
        <StyledGameMenuHeadline>{mode.name}</StyledGameMenuHeadline>
      </StyledGameMenuSection>

      <StyledButtonSection>
        <StyledButtons>
          <StyledButtonYellow type="button" onClick={onGameRestart}>
            Restart
          </StyledButtonYellow>
          <StyledButtonRed as={Link} href="/">
            Quit
          </StyledButtonRed>
        </StyledButtons>
      </StyledButtonSection>
    </StyledGameMenuWrap>
  );
}
