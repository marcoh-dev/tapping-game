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
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  border: var(--border-normal);
  border-radius: var(--border-radius-normal);
  padding: var(--spacing-small) var(--spacing-normal);
`;

export const StyledGameBody = styled.section`
  flex-grow: 1;
  display: flex;
`;
