import Link from "next/link";

import {
	StyledGameMenuHeadline,
	StyledGameMenuSection,
	StyledGameMenuWrap,
} from "./GameMenu.styled";
import {
	StyledButtonRed,
	StyledButtons,
	StyledButtonSection,
	StyledButtonYellow,
} from "../global/Buttons.styled";

export default function GameMenu({ mode, onGameRestart }) {
	return (
		<StyledGameMenuWrap>
			<StyledGameMenuSection>
				<p>Game Mode</p>
				<StyledGameMenuHeadline>{mode.name}</StyledGameMenuHeadline>
			</StyledGameMenuSection>

			<StyledButtonSection>
				<StyledButtons>
					<StyledButtonYellow type="button" onClick={onGameRestart}>
						Restart
					</StyledButtonYellow>
					<StyledButtonRed as={Link} href="/">
						Quit
					</StyledButtonRed>
				</StyledButtons>
			</StyledButtonSection>
		</StyledGameMenuWrap>
	);
}
