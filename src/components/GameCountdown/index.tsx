import { useEffect, useEffectEvent, useState } from "react";

import { StyledGameCountdown, StyledGameCountdownWrap } from "./GameCountdown.styled";

type GameCountdownProps = {
	startFrom?: number;
	onCountdownComplete: () => void;
};

export default function GameCountdown({ startFrom = 3, onCountdownComplete }: GameCountdownProps) {
	const [countdown, setCountdown] = useState(startFrom);
	const completeCountdown = useEffectEvent(onCountdownComplete);

	useEffect(() => {
		if (countdown > 0) {
			const countdownTimer = setTimeout(() => {
				setCountdown((prev) => prev - 1);
			}, 1000);
			return () => clearTimeout(countdownTimer);
		} else {
			completeCountdown();
		}
	}, [countdown]);

	return (
		<StyledGameCountdownWrap>
			<StyledGameCountdown>{countdown > 0 ? countdown : 1}</StyledGameCountdown>
		</StyledGameCountdownWrap>
	);
}
