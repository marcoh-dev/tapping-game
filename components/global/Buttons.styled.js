import styled from "styled-components";

export const StyledButtonSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0;
  text-align: center;
  flex-grow: 1;
  justify-content: flex-end;
`;

export const StyledButtons = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: var(--spacing-normal);
  margin: 0 auto;
`;

export const StyledButton = styled.button`
  all: unset;
  cursor: pointer;
  background-color: var(--gray-200);
  border: var(--border-normal);
  border-radius: var(--border-radius-normal);
  padding: var(--spacing-small) var(--spacing-normal);

  &:hover {
    background-color: var(--gray-400);
  }

  &:focus-visible {
    outline: var(--border-normal);
    outline-offset: var(--outline-offset-normal);
  }
`;

export const StyledButtonGreen = styled(StyledButton)`
  background-color: var(--green-light);

  &:hover {
    background-color: var(--green-dark);
  }
`;
