import {
  StyledButton,
  StyledButtonGreen,
  StyledButtons,
  StyledButtonSection,
} from "@/components/global/Buttons.styled";
import { StyledWrap } from "@/components/global/Global.styled";
import Header from "@/components/Header";
import Head from "next/head";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { GAME_MODES } from "@/lib/gameModes";

export default function HomePage() {
  const { data: session } = useSession();
  const [isGameModeSelect, setIsGameModeSelect] = useState(false);

  return (
    <>
      <Head>
        <title>tapping game</title>
      </Head>
      <Header />
      <main>
        <StyledWrap>
          <StyledButtonSection>
            <StyledButtons>
              {isGameModeSelect ? (
                <>
                  <h2>Mode select</h2>
                  {GAME_MODES.filter((mode) => !mode.disabled)
                    .sort((a, b) => a.order - b.order)
                    .map((mode) => (
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
                  <StyledButtonGreen
                    onClick={() => setIsGameModeSelect(!isGameModeSelect)}
                  >
                    Play
                  </StyledButtonGreen>
                  <StyledButton as={Link} href="/leaderboards">
                    Leaderboards
                  </StyledButton>
                  <StyledButton as={Link} href="/how-to-play">
                    How to play
                  </StyledButton>
                  {session ? (
                    <StyledButton onClick={() => signOut()}>
                      Sign out
                    </StyledButton>
                  ) : (
                    <StyledButton onClick={() => signIn()}>
                      Sign in
                    </StyledButton>
                  )}
                </>
              )}
            </StyledButtons>
          </StyledButtonSection>
        </StyledWrap>
      </main>
    </>
  );
}
