import styled from "styled-components";

export const StyledGameWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--spacing-normal);
  padding: var(--spacing-small);
  flex-grow: 1;
`;

export const StyledGameHeader = styled.section`
  display: grid;
  gap: 1rem;
  border: var(--border-normal);
  border-radius: var(--border-radius-normal);
  padding: var(--spacing-small) var(--spacing-normal);
  text-align: center;

  grid-template-columns: ${({ $isGameOver }) =>
    $isGameOver ? "1fr" : "repeat(3, 1fr)"};

  h1 {
    font-size: var(--headline-font-size-1);
    margin: 0;
    line-height: 1em;
    font-weight: inherit;
    color: var(--gray-600);

    @media (prefers-color-scheme: dark) {
      color: var(--gray-300);
    }
  }
`;

export const StyledGameBody = styled.section`
  flex-grow: 1;
  display: flex;
  position: relative;
`;
