import styled from "styled-components";
import Image from "next/image";
import Link from "next/link";

export const StyledProfileLink = styled(Link)`
  position: absolute;
  top: var(--spacing-normal);
  right: var(--spacing-normal);
  z-index: 30;
  color: inherit;

  svg {
    height: 1.75rem;
    width: auto;
  }
`;

export const StyledProfileDataWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--spacing-large);

  h2 {
    margin: 0;
  }
`;

export const StyledProfileDataImage = styled(Image)`
  height: 4rem;
  width: auto;
  border-radius: 50%;
  border: var(--border-small-lighter);
`;
