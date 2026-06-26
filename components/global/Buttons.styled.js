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

export const StyledButtonList = styled.section`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: var(--spacing-normal);

  justify-content: ${({ $alignRight }) =>
    $alignRight ? "flex-end" : "flex-start"};
`;

export const StyledButtons = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: var(--spacing-normal);
  margin: 0 auto;
`;

export const StyledButton = styled.button`
  color: inherit;
  border: var(--border-normal);
  border-color: ${({ $borderless, $isActive }) => $borderless && "transparent"};
  border-radius: var(--border-radius-normal);
  padding: var(--spacing-small) var(--spacing-normal);

  background-color: ${({ $borderless, $isActive }) =>
    $isActive
      ? $borderless
        ? "var(--green-300)"
        : "var(--gray-300)"
      : "var(--gray-200)"};

  &:hover {
    background-color: ${({ $borderless, $isActive }) =>
      $isActive
        ? $borderless
          ? "var(--green-300)"
          : "var(--gray-300)"
        : "var(--gray-300)"};
  }

  &:focus-visible {
    outline: var(--border-normal);
    outline-offset: var(--outline-offset-normal);
  }

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
    border: none;
  }

  @media (prefers-color-scheme: dark) {
    background-color: ${({ $borderless, $isActive }) =>
      $isActive
        ? $borderless
          ? "var(--green-700)"
          : "var(--gray-600)"
        : "var(--gray-700)"};
    &:hover {
      background-color: ${({ $borderless, $isActive }) =>
        $isActive
          ? $borderless
            ? "var(--green-700)"
            : "var(--gray-600)"
          : "var(--gray-600)"};
    }
  }
`;

export const StyledButtonGreen = styled(StyledButton)`
  background-color: ${({ $isActive }) =>
    $isActive ? "var(--green-300)" : "var(--green-200)"};

  &:hover {
    background-color: var(--green-300);
  }

  @media (prefers-color-scheme: dark) {
    background-color: ${({ $isActive }) =>
      $isActive ? "var(--green-700)" : "var(--green-800)"};

    &:hover {
      background-color: var(--green-700);
    }
  }
`;

export const StyledButtonYellow = styled(StyledButton)`
  background-color: ${({ $isActive }) =>
    $isActive ? "var(--yellow-300)" : "var(--yellow-200)"};

  &:hover {
    background-color: var(--yellow-300);
  }

  @media (prefers-color-scheme: dark) {
    background-color: ${({ $isActive }) =>
      $isActive ? "var(--yellow-700)" : "var(--yellow-800)"};

    &:hover {
      background-color: var(--yellow-700);
    }
  }
`;

export const StyledButtonRed = styled(StyledButton)`
  background-color: ${({ $isActive }) =>
    $isActive ? "var(--red-300)" : "var(--red-200)"};

  &:hover {
    background-color: var(--red-300);
  }

  @media (prefers-color-scheme: dark) {
    background-color: ${({ $isActive }) =>
      $isActive ? "var(--red-700)" : "var(--red-800)"};

    &:hover {
      background-color: var(--red-700);
    }
  }
`;
