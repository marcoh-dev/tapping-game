import {
  StyledTextpageHeader,
  StyledTextpageButtonListWrap,
  StyledBackLink,
  StyledTextpageSection,
} from "@/components/global/Global.styled";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { GAME_MODES } from "@/lib/gameModes";
import useSWR from "swr";

import {
  StyledButton,
  StyledButtonList,
} from "@/components/global/Buttons.styled";
import {
  StyledLeaderboardHeader,
  StyledLeaderboardWrap,
  StyledLeaderboardHeaderCell,
  StyledLeaderboardBody,
  StyledLeaderboardBodyRow,
  StyledLeaderboardCell,
  StyledLeaderboardProfileImage,
} from "@/components/global/Leaderboard.styled";
import useLocalStorageState from "use-local-storage-state";
import { useState } from "react";

export default function GameLeaderboards() {
  const [localScoreHistory, setLocalScoreHistory] = useLocalStorageState(
    "localScoreHistory",
    {
      defaultValue: [],
    }
  );
  const [isObsoleteVisible, setIsObsoleteVisible] = useState(false);

  const router = useRouter();

  const scope = router.query.scope ?? "global";
  const currentMode = router.query.mode ?? "30s";

  const params = new URLSearchParams();

  if (currentMode) {
    params.append("mode", currentMode);
  }
  const isLocal = scope === "local";
  const shouldFetch = !isLocal;
  const {
    data: onlineScores,
    isLoading: scoresLoading,
    error: scoresError,
  } = useSWR(shouldFetch ? `/api/scores?${params.toString()}` : null);

  const scores = isLocal ? getLocalScores() : (onlineScores ?? []);
  const isLoading = shouldFetch ? scoresLoading : false;
  const hasError = shouldFetch ? scoresError : null;

  function buildUrl(newParams) {
    const current = {
      mode: currentMode,
      scope: scope,
      ...newParams,
    };

    return `/leaderboards?mode=${current.mode}&scope=${current.scope}`;
  }

  function getLocalScores() {
    return localScoreHistory
      .filter((entry) => entry.isHighscore && entry.mode === currentMode)
      .sort((a, b) => b.score - a.score)
      .map((entry) => ({
        score: entry.score,
        createdAt: entry.timestamp,
        mode: entry.mode,
      }));
  }

  const seenUsers = new Set();
  let rank = 0;

  const leaderboard = scores.map((entry) => {
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
  });

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
                disabled={localScoreHistory.length === 0}
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
            {GAME_MODES.filter((mode) => !mode.disabled)
              .sort((a, b) => a.order - b.order)
              .map((mode) => (
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
        ) : scores.length === 0 ? (
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
              {scores.map((entry, index) => (
                <StyledLeaderboardBodyRow key={index}>
                  <StyledLeaderboardCell>{index + 1}.</StyledLeaderboardCell>
                  <StyledLeaderboardCell>{entry.score}</StyledLeaderboardCell>
                  <StyledLeaderboardCell>
                    {new Date(entry.createdAt).toLocaleString()}
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
                      {entry.user.name}
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
                show obsolete
              </StyledButton>
            </StyledButtonList>
          </StyledTextpageButtonListWrap>
        )}
      </main>
    </>
  );
}
