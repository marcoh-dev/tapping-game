"use client";

import Link from "next/link";
import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";

import FormattedDate from "@/components/FormattedDate";
import { StyledButton, StyledButtonList } from "@/components/global/Buttons.styled";
import {
	StyledBackLink,
	StyledTextpageButtonListWrap,
	StyledTextpageHeader,
	StyledTextpageSection,
} from "@/components/global/Global.styled";
import {
	StyledLeaderboardBody,
	StyledLeaderboardBodyRow,
	StyledLeaderboardCell,
	StyledLeaderboardCellTextWrap,
	StyledLeaderboardHeader,
	StyledLeaderboardHeaderCell,
	StyledLeaderboardProfileImage,
	StyledLeaderboardWrap,
} from "@/components/global/Leaderboard.styled";
import ProfileIcon from "@/components/icons/ProfileIcon";
import { ACTIVE_GAME_MODES } from "@/lib/gameModes";
import type { LeaderboardScore } from "@/types/api";
import type { LocalScoreEntry } from "@/types/game";
import { rankScores } from "@/utils/leaderboard";

const EAGER_IMAGE_ROWS = 5;

export type LeaderboardScope = "global" | "local";

type LeaderboardProps = {
	scope: LeaderboardScope;
	currentMode: string;
	onlineScores: LeaderboardScore[] | null;
};

export default function Leaderboard({ scope, currentMode, onlineScores }: LeaderboardProps) {
	const [localScoreHistory] = useLocalStorageState<LocalScoreEntry[]>("localScoreHistory", {
		defaultValue: [],
	});
	const [isObsoleteVisible, setIsObsoleteVisible] = useState(false);

	const isLocal = scope === "local";
	const localScores = localScoreHistory
		.filter((entry) => entry.isHighscore && entry.mode === currentMode)
		.sort((a, b) => b.score - a.score);
	const leaderboard = rankScores(onlineScores ?? []);

	const scoreCount = isLocal ? localScores.length : leaderboard.length;
	const hasError = !isLocal && onlineScores === null;

	function buildUrl(newParams: { mode?: string; scope?: LeaderboardScope }) {
		const current = {
			mode: currentMode,
			scope,
			...newParams,
		};

		return `/leaderboards?mode=${current.mode}&scope=${current.scope}`;
	}

	return (
		<>
			<StyledTextpageHeader>
				<StyledBackLink href="/">&lt;</StyledBackLink>
				<h1>Leaderboards</h1>
			</StyledTextpageHeader>
			<main>
				<StyledTextpageButtonListWrap>
					<StyledButtonList>
						<StyledButton
							as={Link}
							href={buildUrl({ scope: "global" })}
							$isActive={scope === "global"}
							$borderless
						>
							Online
						</StyledButton>

						{localScoreHistory.length === 0 ? (
							<StyledButton $borderless disabled>
								Local
							</StyledButton>
						) : (
							<StyledButton
								as={Link}
								href={buildUrl({ scope: "local" })}
								$isActive={scope === "local"}
								$borderless
							>
								Local
							</StyledButton>
						)}
					</StyledButtonList>
					<StyledButtonList>
						{ACTIVE_GAME_MODES.map((mode) => (
							<StyledButton
								key={mode.id}
								as={Link}
								href={buildUrl({ mode: mode.id })}
								$isActive={currentMode === mode.id}
								$borderless
							>
								{mode.name}
							</StyledButton>
						))}
					</StyledButtonList>
				</StyledTextpageButtonListWrap>
				{hasError ? (
					<StyledTextpageSection>
						<p>Scores could not be loaded.</p>
					</StyledTextpageSection>
				) : scoreCount === 0 ? (
					<StyledTextpageSection>
						<p>No records yet.</p>
					</StyledTextpageSection>
				) : isLocal ? (
					<StyledLeaderboardWrap>
						<StyledLeaderboardHeader>
							<StyledLeaderboardHeaderCell>#</StyledLeaderboardHeaderCell>
							<StyledLeaderboardHeaderCell>Score</StyledLeaderboardHeaderCell>
							<StyledLeaderboardHeaderCell>Date</StyledLeaderboardHeaderCell>
						</StyledLeaderboardHeader>

						<StyledLeaderboardBody>
							{localScores.map((entry, index) => (
								<StyledLeaderboardBodyRow key={index}>
									<StyledLeaderboardCell>{index + 1}.</StyledLeaderboardCell>
									<StyledLeaderboardCell>{entry.score}</StyledLeaderboardCell>
									<StyledLeaderboardCell>
										<FormattedDate date={entry.timestamp} />
									</StyledLeaderboardCell>
								</StyledLeaderboardBodyRow>
							))}
						</StyledLeaderboardBody>
					</StyledLeaderboardWrap>
				) : (
					<StyledLeaderboardWrap>
						<StyledLeaderboardHeader>
							<StyledLeaderboardHeaderCell>#</StyledLeaderboardHeaderCell>
							<StyledLeaderboardHeaderCell>Name</StyledLeaderboardHeaderCell>
							<StyledLeaderboardHeaderCell>Score</StyledLeaderboardHeaderCell>
							<StyledLeaderboardHeaderCell>Date</StyledLeaderboardHeaderCell>
						</StyledLeaderboardHeader>
						<StyledLeaderboardBody>
							{leaderboard
								.filter((entry) => isObsoleteVisible || !entry.isObsolete)
								.map((entry, index) => (
									<StyledLeaderboardBodyRow key={entry._id}>
										<StyledLeaderboardCell>
											{entry.rank && `${entry.rank}.`}
										</StyledLeaderboardCell>
										<StyledLeaderboardCell $isObsolete={entry.isObsolete}>
											{entry.user.image && (
												<StyledLeaderboardProfileImage
													loading={
														index < EAGER_IMAGE_ROWS ? "eager" : "lazy"
													}
													width={100}
													height={100}
													src={entry.user.image}
													alt=""
												/>
											)}
											<StyledLeaderboardCellTextWrap>
												{entry.user.name}
												<Link href={`/users/${entry.user._id}`}>
													<ProfileIcon />
												</Link>
											</StyledLeaderboardCellTextWrap>
										</StyledLeaderboardCell>
										<StyledLeaderboardCell $isObsolete={entry.isObsolete}>
											{entry.score}
										</StyledLeaderboardCell>
										<StyledLeaderboardCell $isObsolete={entry.isObsolete}>
											<FormattedDate date={entry.createdAt} />
										</StyledLeaderboardCell>
									</StyledLeaderboardBodyRow>
								))}
						</StyledLeaderboardBody>
					</StyledLeaderboardWrap>
				)}

				{!isLocal && (
					<StyledTextpageButtonListWrap>
						<StyledButtonList $alignRight>
							<StyledButton
								$isActive={isObsoleteVisible}
								$borderless
								onClick={() => setIsObsoleteVisible(!isObsoleteVisible)}
							>
								{isObsoleteVisible ? <>hide obsolete</> : <>show obsolete</>}
							</StyledButton>
						</StyledButtonList>
					</StyledTextpageButtonListWrap>
				)}
			</main>
		</>
	);
}
