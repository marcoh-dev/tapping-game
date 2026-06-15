import styled from "styled-components";

export const StyledGameOverWrap = styled.section`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 20;
  background-color: var(--gray-200-80);
  border: var(--border-normal);
  border-radius: var(--border-radius-normal);
  padding: var(--spacing-large) var(--spacing-normal);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-large);
`;

export const StyledGameOverSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0;
  text-align: center;
`;

export const StyledGameOverHeadline = styled.h2`
  margin: 0;
  font-weight: inherit;
  color: ${({ $isHighscoreBeaten }) =>
    $isHighscoreBeaten ? "var(--gold-dark)" : "inherit"};
`;

export const StyledGameOverScore = styled.p`
  margin: 0;
  font-size: var(--gameover-score-font-size);
  line-height: var(--gameover-score-line-height);

  color: ${({ $isHighscoreBeaten }) =>
    $isHighscoreBeaten ? "var(--gold-dark)" : "inherit"};
`;

export const StyledGameOverButtonSection = styled(StyledGameOverSection)`
  flex-grow: 1;
  justify-content: flex-end;
`;

export const StyledGameOverButtons = styled.div`
  margin: 0 auto;
`;

export const StyledGameOverButton = styled.button`
  all: unset;
  cursor: pointer;
  background-color: var(--green-light);
  border: var(--border-normal);
  border-radius: var(--border-radius-normal);
  padding: var(--spacing-small) var(--spacing-normal);

  &:hover {
    background-color: var(--green-dark);
  }

  &:focus-visible {
    outline: var(--border-normal);
    outline-offset: var(--outline-offset-normal);
  }
`;
