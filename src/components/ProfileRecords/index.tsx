"use client";

import { Fragment, useState } from "react";

import { StyledButton, StyledButtonList } from "@/components/global/Buttons.styled";
import {
	StyledTextpageButtonListWrap,
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
import { ACTIVE_GAME_MODES } from "@/lib/gameModes";
import type { LeaderboardScore } from "@/types/api";
import { rankScores } from "@/utils/leaderboard";

type ProfileRecordsProps = {
	userId: string;
	scores: LeaderboardScore[];
};

export default function ProfileRecords({ userId, scores }: ProfileRecordsProps) {
	const [isObsoleteVisible, setIsObsoleteVisible] = useState(false);

	function getRecords(mode: string) {
		return rankScores(scores.filter((entry) => entry.mode === mode)).filter(
			(entry) => entry.user._id === userId && (isObsoleteVisible || !entry.isObsolete),
		);
	}

	return (
		<>
			<StyledTextpageSection>
				<h2>Records:</h2>
			</StyledTextpageSection>

			{ACTIVE_GAME_MODES.map((mode) => {
				const records = getRecords(mode.id);

				return (
					<Fragment key={mode.id}>
						<StyledTextpageSection>
							<h3>{mode.name}</h3>
						</StyledTextpageSection>

						{records.length === 0 ? (
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
									{records.map((entry) => (
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
					</Fragment>
				);
			})}

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
	);
}
