import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import useLocalStorageState from "use-local-storage-state";

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
import ProfileIcon from "@/icons/profile.svg";
import { ACTIVE_GAME_MODES } from "@/lib/gameModes";
import type { LeaderboardScore } from "@/types/api";
import type { LocalScoreEntry } from "@/types/game";
import { rankScores } from "@/utils/leaderboard";

type LeaderboardScope = "global" | "local";

export default function GameLeaderboards() {
	const [localScoreHistory] = useLocalStorageState<LocalScoreEntry[]>("localScoreHistory", {
		defaultValue: [],
	});
	const [isObsoleteVisible, setIsObsoleteVisible] = useState(false);

	const router = useRouter();

	const scope: LeaderboardScope = router.query.scope === "local" ? "local" : "global";
	const currentMode = typeof router.query.mode === "string" ? router.query.mode : "30s";

	const isLocal = scope === "local";
	const {
		data: onlineScores,
		isLoading: scoresLoading,
		error: scoresError,
	} = useSWR<LeaderboardScore[]>(
		isLocal ? null : `/api/scores?${new URLSearchParams({ mode: currentMode }).toString()}`,
	);

	const localScores = localScoreHistory
		.filter((entry) => entry.isHighscore && entry.mode === currentMode)
		.sort((a, b) => b.score - a.score);
	const leaderboard = rankScores(onlineScores ?? []);

	const scoreCount = isLocal ? localScores.length : leaderboard.length;
	const isLoading = !isLocal && scoresLoading;
	const hasError = !isLocal && Boolean(scoresError);

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
			<Head>
				<title>Leaderboards</title>
			</Head>
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
				{isLoading ? (
					<StyledTextpageSection>
						<p>Loading scores...</p>
					</StyledTextpageSection>
				) : hasError ? (
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
										{new Date(entry.timestamp).toLocaleString()}
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
								.map((entry) => (
									<StyledLeaderboardBodyRow key={entry._id}>
										<StyledLeaderboardCell>
											{entry.rank && `${entry.rank}.`}
										</StyledLeaderboardCell>
										<StyledLeaderboardCell $isObsolete={entry.isObsolete}>
											{entry.user.image && (
												<StyledLeaderboardProfileImage
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
											{new Date(entry.createdAt).toLocaleString()}
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
