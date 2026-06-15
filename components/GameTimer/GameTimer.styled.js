import styled from "styled-components";

export const StyledGameTimerSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ $isLastFiveSeconds }) =>
    $isLastFiveSeconds ? "var(--warning-color)" : "inherit"};
`;

export const StyledGameTimerSecond = styled.span`
  font-size: var(--headline-font-size-1);
`;
