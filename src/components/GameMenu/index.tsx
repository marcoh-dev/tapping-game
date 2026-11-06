import Link from "next/link";

import {
	StyledButtonRed,
	StyledButtons,
	StyledButtonSection,
	StyledButtonYellow,
} from "@/components/global/Buttons.styled";
import type { GameMode } from "@/types/game";

import {
	StyledGameMenuHeadline,
	StyledGameMenuSection,
	StyledGameMenuWrap,
} from "./GameMenu.styled";

type GameMenuProps = {
	mode: GameMode;
	onGameRestart: () => void;
};

export default function GameMenu({ mode, onGameRestart }: GameMenuProps) {
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
