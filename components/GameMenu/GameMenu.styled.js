import styled from "styled-components";
import {
  StyledGameOverWrap,
  StyledGameOverSection,
  StyledGameOverHeadline,
} from "../GameOver/GameOver.styled";

export const StyledGameMenuButton = styled.button`
  all: unset;
  margin-left: auto;

  border-radius: var(--border-radius-small);

  &:focus-visible {
    outline: var(--border-normal);
    outline-offset: var(--outline-offset-normal);
  }

  img {
    height: 1.75rem;
    width: auto;
  }
`;

export const StyledGameMenuWrap = styled(StyledGameOverWrap)``;
export const StyledGameMenuSection = styled(StyledGameOverSection)``;
export const StyledGameMenuHeadline = styled(StyledGameOverHeadline)``;
