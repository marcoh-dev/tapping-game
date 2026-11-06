import type { Metadata } from "next";
import { Fragment } from "react";

import {
	StyledBackLink,
	StyledTextpageHeader,
	StyledTextpageSection,
} from "@/components/global/Global.styled";
import { ACTIVE_GAME_MODES } from "@/lib/gameModes";

export const metadata: Metadata = {
	title: "How to play",
};

export default function HowToPlayPage() {
	return (
		<>
			<StyledTextpageHeader>
				<StyledBackLink href="/">&lt;</StyledBackLink>
				<h1>How to play</h1>
			</StyledTextpageHeader>
			<main>
				<StyledTextpageSection>
					<p>Welcome to the tapping game!</p>
					<p>
						The goal is easy: tap as many targets appearing on the screen as possible.
						Each tapped target increases your score. Try beating your own record!
					</p>
					<p>
						You can play the game without signing in, records are saved locally then.{" "}
						<br />
						Sign in if you want to compete against records of others.
					</p>
					<p>
						You can play the game via touch, mouse or even keyboard (TAB + Enter) -
						choose your own play style.
					</p>
					<p>The following modes exist:</p>

					{ACTIVE_GAME_MODES.map((mode) => (
						<Fragment key={mode.id}>
							<h2>{mode.name}</h2>
							<p>{mode.description}</p>
						</Fragment>
					))}
				</StyledTextpageSection>
			</main>
		</>
	);
}
