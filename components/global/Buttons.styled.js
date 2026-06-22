import styled from "styled-components";

export const StyledButtonSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0;
  text-align: center;
  flex-grow: 1;
  justify-content: ${({ $alignBottom }) =>
    $alignBottom ? "flex-end" : "flex-start"};
`;

export const StyledButtons = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: var(--spacing-normal);
  margin: 0 auto;
`;

export const StyledButton = styled.button`
  color: inherit;
  background-color: var(--gray-200);
  border: var(--border-normal);
  border-radius: var(--border-radius-normal);
  padding: var(--spacing-small) var(--spacing-normal);

  &:hover {
    background-color: var(--gray-300);
  }

  &:focus-visible {
    outline: var(--border-normal);
    outline-offset: var(--outline-offset-normal);
  }

  @media (prefers-color-scheme: dark) {
    background-color: var(--gray-700);
    &:hover {
      background-color: var(--gray-600);
    }
  }
`;

export const StyledButtonGreen = styled(StyledButton)`
  background-color: var(--green-200);

  &:hover {
    background-color: var(--green-300);
  }

  @media (prefers-color-scheme: dark) {
    background-color: var(--green-800);

    &:hover {
      background-color: var(--green-700);
    }
  }
`;

export const StyledButtonYellow = styled(StyledButton)`
  background-color: var(--yellow-200);

  &:hover {
    background-color: var(--yellow-300);
  }

  @media (prefers-color-scheme: dark) {
    background-color: var(--yellow-800);

    &:hover {
      background-color: var(--yellow-700);
    }
  }
`;

export const StyledButtonRed = styled(StyledButton)`
  background-color: var(--red-200);

  &:hover {
    background-color: var(--red-300);
  }

  @media (prefers-color-scheme: dark) {
    background-color: var(--red-800);

    &:hover {
      background-color: var(--red-700);
    }
  }
`;
