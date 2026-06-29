import {
  StyledTextpageHeader,
  StyledTextpageButtonListWrap,
  StyledBackLink,
  StyledTextpageSection,
} from "@/components/global/Global.styled";
import {
  StyledButton,
  StyledButtonList,
} from "@/components/global/Buttons.styled";
import {
  StyledProfileDataImage,
  StyledProfileDataWrap,
} from "@/components/global/Profile.styled";
import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";

import {
  StyledLeaderboardHeader,
  StyledLeaderboardWrap,
  StyledLeaderboardHeaderCell,
  StyledLeaderboardBody,
  StyledLeaderboardBodyRow,
  StyledLeaderboardCell,
  StyledLeaderboardCellTextWrap,
  StyledLeaderboardProfileImage,
} from "@/components/global/Leaderboard.styled";
import { useState } from "react";

export default function ProfilePage() {
  const [isObsoleteVisible, setIsObsoleteVisible] = useState(false);
  const router = useRouter();
  const { userId, back } = router.query;

  const {
    data: user,
    isLoading: userLoading,
    error: userError,
  } = useSWR(`/api/users/${userId}`);

  const params = new URLSearchParams();
  //params.append("userId", userId);
  const {
    data: onlineScores,
    isLoading: scoresLoading,
    error: scoresError,
  } = useSWR(`/api/scores?${params.toString()}`);

  const isLoading = userLoading || scoresLoading;
  const hasError = userError || scoresError;

  function getLeaderboard(outputMode) {
    const seenUsers = new Set();
    let rank = 0;

    const leaderboard = onlineScores
      ?.filter((entry) => entry.mode === outputMode)
      .map((entry) => {
        const isObsolete = seenUsers.has(entry?.user?._id);

        if (!isObsolete) {
          seenUsers.add(entry?.user?._id);
          rank++;
        }

        return {
          ...entry,
          isObsolete,
          rank: isObsolete ? null : rank,
        };
      })
      .filter((entry) => entry.user?._id === userId);

    return leaderboard;
  }

  const leaderboard60s = getLeaderboard("60s")?.filter(
    (entry) => isObsoleteVisible || !entry.isObsolete
  );

  const leaderboard30s = getLeaderboard("30s")?.filter(
    (entry) => isObsoleteVisible || !entry.isObsolete
  );

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
                <h2>{user.name}</h2>
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
                  <StyledLeaderboardHeaderCell>
                    Name
                  </StyledLeaderboardHeaderCell>
                  <StyledLeaderboardHeaderCell>
                    Score
                  </StyledLeaderboardHeaderCell>
                  <StyledLeaderboardHeaderCell>
                    Date
                  </StyledLeaderboardHeaderCell>
                </StyledLeaderboardHeader>
                <StyledLeaderboardBody>
                  {leaderboard30s.map((entry) => (
                    <StyledLeaderboardBodyRow
                      key={entry._id}
                      $isObsolete={entry.isObsolete}
                    >
                      <StyledLeaderboardCell>
                        {entry.rank && `${entry.rank}.`}
                      </StyledLeaderboardCell>
                      <StyledLeaderboardCell $isObsolete={entry.isObsolete}>
                        {entry?.user?.image && (
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
                  <StyledLeaderboardHeaderCell>
                    Name
                  </StyledLeaderboardHeaderCell>
                  <StyledLeaderboardHeaderCell>
                    Score
                  </StyledLeaderboardHeaderCell>
                  <StyledLeaderboardHeaderCell>
                    Date
                  </StyledLeaderboardHeaderCell>
                </StyledLeaderboardHeader>
                <StyledLeaderboardBody>
                  {leaderboard60s.map((entry) => (
                    <StyledLeaderboardBodyRow
                      key={entry._id}
                      $isObsolete={entry.isObsolete}
                    >
                      <StyledLeaderboardCell>
                        {entry.rank && `${entry.rank}.`}
                      </StyledLeaderboardCell>
                      <StyledLeaderboardCell $isObsolete={entry.isObsolete}>
                        {entry?.user?.image && (
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
