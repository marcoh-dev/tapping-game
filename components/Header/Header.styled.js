import styled from "styled-components";

export const StyledHeader = styled.header`
  margin: 0;
  padding: var(--spacing-small);

  h1 {
    font-size: var(--gameover-score-font-size);
    line-height: var(--gameover-score-line-height);
    text-align: center;
    font-weight: inherit;
    width: fit-content;
    margin: var(--spacing-xlarge) auto var(--spacing-large);
    padding: var(--spacing-small) var(--spacing-normal);
  }
`;

export const StyledHeadline = styled.h1`
  color: ${({ $allTargetsClicked }) =>
    $allTargetsClicked ? "var(--gold-dark)" : "inherit"};
`;

export const StyledHeaderGameArea = styled.section`
  position: relative;
  overflow: hidden;
  width: 100%;
  margin: 0;
  user-select: none;
`;
