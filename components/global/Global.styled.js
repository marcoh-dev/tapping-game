import styled from "styled-components";
import Link from "next/link";

export const StyledWrap = styled.section`
  height: 100%;
  border: var(--border-normal);
  border-color: transparent;
  border-radius: var(--border-radius-normal);
  padding: var(--spacing-large) var(--spacing-normal);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-large);
`;

export const StyledTextpageHeader = styled.header`
  display: flex;
  gap: var(--spacing-normal);
  padding: var(--spacing-normal) 0;
  border-bottom: 2px solid var(--gray-200);
  margin: 0 var(--spacing-normal);
`;

export const StyledBackLink = styled(Link)`
  font-family: var(--headline-font-family);
  font-size: var(--headline-font-size-1);
  line-height: var(--headline-line-height);
  color: inherit;
`;

export const StyledTextpageSection = styled.section`
  margin: var(--spacing-normal);
`;
