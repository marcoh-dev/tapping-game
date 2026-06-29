import styled from "styled-components";
import Image from "next/image";

export const StyledLeaderboardWrap = styled.div`
  margin: var(--spacing-normal);
  gap: 0;

  display: flex;
  flex-direction: column;
  border: var(--border-small);
  border-radius: var(--border-radius-normal);

  overflow: hidden;
`;

const StyledLeaderboardRow = styled.div`
  display: grid;
  grid-template-columns: 1.5ch auto 5ch 7ch;
  gap: var(--spacing-small);
  align-items: center;
  padding: var(--spacing-small) var(--spacing-normal);
`;

export const StyledLeaderboardHeader = styled(StyledLeaderboardRow)`
  position: sticky;
  top: 0;
  font-weight: bold;
  z-index: 10;
  border-bottom: var(--border-small);
  border-radius: var(--border-radius-normal) var(--border-radius-normal) 0 0;

  background-color: var(--gray-200);

  @media (prefers-color-scheme: dark) {
    background-color: var(--gray-800);
  }
`;

export const StyledLeaderboardHeaderCell = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  justify-content: left;
`;

export const StyledLeaderboardBody = styled.div`
  overflow-y: auto;
  flex: 1;
`;

export const StyledLeaderboardBodyRow = styled(StyledLeaderboardRow)`
  &:not(:first-child) {
    border-top: var(--border-small-lighter);
  }

  &:nth-child(even) {
    background-color: var(--gray-150);
  }

  &:hover {
    background-color: var(--gray-200);
  }

  @media (prefers-color-scheme: dark) {
    &:nth-child(even) {
      background-color: var(--gray-850);
    }

    &:hover {
      background-color: var(--gray-800);
    }
  }
`;

export const StyledLeaderboardCell = styled.div`
  word-break: keep-all;
  display: flex;
  flex-direction: row;
  gap: var(--spacing-small);
  align-items: center;

  font-size: var(--text-font-size-small);
  line-height: var(--text-line-height);

  opacity: ${({ $isObsolete }) => ($isObsolete ? "0.6" : "1")};
`;

export const StyledLeaderboardCellTextWrap = styled.span`
  display: flex;
  gap: var(--spacing-small);
  align-items: center;

  a {
    svg {
      height: 1rem;
      width: auto;
    }
  }
`;

export const StyledLeaderboardProfileImage = styled(Image)`
  height: 1.75rem;
  width: auto;
  border-radius: 50%;
  border: var(--border-small-lighter);
`;
