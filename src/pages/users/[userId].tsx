import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";

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
import { StyledProfileDataImage, StyledProfileDataWrap } from "@/components/global/Profile.styled";
import type { LeaderboardScore, User } from "@/types/api";
import { rankScores } from "@/utils/leaderboard";

export default function ProfilePage() {
	const [isObsoleteVisible, setIsObsoleteVisible] = useState(false);
	const router = useRouter();
	const { userId, back } = router.query;

	const {
		data: user,
		isLoading: userLoading,
		error: userError,
	} = useSWR<User>(typeof userId === "string" ? `/api/users/${userId}` : null);

	const {
		data: onlineScores,
		isLoading: scoresLoading,
		error: scoresError,
	} = useSWR<LeaderboardScore[]>("/api/scores");

	const isLoading = !router.isReady || userLoading || scoresLoading;
	const hasError = Boolean(userError || scoresError);

	function getLeaderboard(outputMode: string) {
		return rankScores((onlineScores ?? []).filter((entry) => entry.mode === outputMode)).filter(
			(entry) => entry.user._id === userId && (isObsoleteVisible || !entry.isObsolete),
		);
	}

	const leaderboard30s = getLeaderboard("30s");
	const leaderboard60s = getLeaderboard("60s");

	return (
		<>
			<Head>
				<title>Profile page</title>
			</Head>
			<StyledTextpageHeader>
				{back === "home" ? (
					<StyledBackLink href="/">&lt;</StyledBackLink>
				) : (
					<StyledBackLink href="/leaderboards">&lt;</StyledBackLink>
				)}
				<h1>Profile</h1>
			</StyledTextpageHeader>
			<main>
				{isLoading ? (
					<StyledTextpageSection>
						<p>Loading user...</p>
					</StyledTextpageSection>
				) : hasError ? (
					<StyledTextpageSection>
						<p>User data could not be loaded.</p>
					</StyledTextpageSection>
				) : (
					<>
						<StyledTextpageSection>
							<StyledProfileDataWrap>
								{user?.image && (
									<StyledProfileDataImage
										width={100}
										height={100}
										src={user.image}
										alt=""
									/>
								)}
								<h2>{user?.name}</h2>
							</StyledProfileDataWrap>
						</StyledTextpageSection>
						<StyledTextpageSection>
							<h2>Records:</h2>
							<h3>30 seconds</h3>
						</StyledTextpageSection>

						{leaderboard30s.length === 0 ? (
							<StyledTextpageSection>
								<p>No records yet.</p>
							</StyledTextpageSection>
						) : (
							<StyledLeaderboardWrap>
								<StyledLeaderboardHeader>
									<StyledLeaderboardHeaderCell>#</StyledLeaderboardHeaderCell>
									<StyledLeaderboardHeaderCell>Name</StyledLeaderboardHeaderCell>
									<StyledLeaderboardHeaderCell>Score</StyledLeaderboardHeaderCell>
									<StyledLeaderboardHeaderCell>Date</StyledLeaderboardHeaderCell>
								</StyledLeaderboardHeader>
								<StyledLeaderboardBody>
									{leaderboard30s.map((entry) => (
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
						<StyledTextpageSection>
							<h3>1 minute</h3>
						</StyledTextpageSection>
						{leaderboard60s.length === 0 ? (
							<StyledTextpageSection>
								<p>No records yet.</p>
							</StyledTextpageSection>
						) : (
							<StyledLeaderboardWrap>
								<StyledLeaderboardHeader>
									<StyledLeaderboardHeaderCell>#</StyledLeaderboardHeaderCell>
									<StyledLeaderboardHeaderCell>Name</StyledLeaderboardHeaderCell>
									<StyledLeaderboardHeaderCell>Score</StyledLeaderboardHeaderCell>
									<StyledLeaderboardHeaderCell>Date</StyledLeaderboardHeaderCell>
								</StyledLeaderboardHeader>
								<StyledLeaderboardBody>
									{leaderboard60s.map((entry) => (
										<StyledLeaderboardBodyRow key={entry._id}>
											<StyledLeaderboardCell>
												{entry.rank && `${entry.rank}.`}
											</StyledLeaderboardCell>
											<StyledLeaderboardCell $isObsolete={entry.isObsolete}>
												{entry.user.image && (
													<StyledLeaderboardProfileImage
														width={200}
														height={200}
														src={entry.user.image}
														alt=""
													/>
												)}
												<StyledLeaderboardCellTextWrap>
													{entry.user.name}
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
					</>
				)}
			</main>
		</>
	);
}
