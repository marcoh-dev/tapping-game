"use client";

import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { useState } from "react";

import {
	StyledButton,
	StyledButtonGreen,
	StyledButtons,
	StyledButtonSection,
} from "@/components/global/Buttons.styled";
import { StyledWrap } from "@/components/global/Global.styled";
import { StyledProfileLink } from "@/components/global/Profile.styled";
import ProfileIcon from "@/icons/profile.svg";
import { ACTIVE_GAME_MODES } from "@/lib/gameModes";

type HomeMenuProps = {
	userId?: string;
};

export default function HomeMenu({ userId }: HomeMenuProps) {
	const [isGameModeSelect, setIsGameModeSelect] = useState(false);

	return (
		<>
			{userId && (
				<StyledProfileLink href={`/users/${userId}?back=home`}>
					<ProfileIcon />
				</StyledProfileLink>
			)}
			<StyledWrap>
				<StyledButtonSection>
					<StyledButtons>
						{isGameModeSelect ? (
							<>
								<h2>Mode select</h2>
								{ACTIVE_GAME_MODES.map((mode) => (
									<StyledButtonGreen
										key={mode.id}
										as={Link}
										href={`/game?mode=${mode.id}`}
									>
										{mode.name}
									</StyledButtonGreen>
								))}
								<StyledButton onClick={() => setIsGameModeSelect(false)}>
									Back
								</StyledButton>
							</>
						) : (
							<>
								<StyledButtonGreen onClick={() => setIsGameModeSelect(true)}>
									Play
								</StyledButtonGreen>
								<StyledButton as={Link} href="/leaderboards">
									Leaderboards
								</StyledButton>
								<StyledButton as={Link} href="/how-to-play">
									How to play
								</StyledButton>
								{userId ? (
									<StyledButton onClick={() => signOut()}>Sign out</StyledButton>
								) : (
									<StyledButton onClick={() => signIn()}>Sign in</StyledButton>
								)}
							</>
						)}
					</StyledButtons>
				</StyledButtonSection>
			</StyledWrap>
		</>
	);
}
