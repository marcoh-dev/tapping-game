import styled from "styled-components";

export const StyledGameArea = styled.section`
  position: relative;
  overflow: hidden;
  width: 100%;
  margin: var(--spacing-xlarge) var(--spacing-small) var(--spacing-xxlarge);
  user-select: none;
`;

export const StyledGameTarget = styled.button`
  border-radius: 50%;
  background-color: var(--gray-900);
  position: absolute;

  opacity: ${({ $isHidden }) => ($isHidden ? 0 : 1)};
  pointer-events: ${({ $isHidden }) => ($isHidden ? "none" : "auto")};
  transition: opacity 150ms ease;

  &:focus-visible {
    outline: var(--border-normal);
    outline-offset: var(--outline-offset-normal);
  }

  &:disabled {
    background-color: var(--gray-600);
  }

  @media (prefers-color-scheme: dark) {
    background-color: var(--gray-100);
    &:disabled {
      background-color: var(--gray-400);
    }
  }
`;
