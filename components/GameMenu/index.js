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

export default function GameMenu({ onGameRestart }) {
  return (
    <StyledGameMenuWrap>
      <StyledGameMenuSection>
        <StyledGameMenuHeadline>Menu</StyledGameMenuHeadline>
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
