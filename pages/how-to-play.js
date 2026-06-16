import {
  StyledTextpageHeader,
  StyledBackLink,
  StyledTextpageSection,
} from "@/components/global/Global.styled";
import Head from "next/head";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>How to play</title>
      </Head>
      <StyledTextpageHeader>
        <StyledBackLink href="/">&lt;</StyledBackLink>
        <h1>How to play</h1>
      </StyledTextpageHeader>
      <main>
        <StyledTextpageSection>
          <p>Welcome to the tapping game!</p>
          <p>
            The goal is easy: tap as many targets appearing on the screen as
            possible before the time runs out.
          </p>
          <p>
            Each tapped target increase your score. Try beating your own
            highscore!
          </p>
          <p>
            You can play the game via touch, mouse or even keyboard (TAB +
            Enter) - choose your own play style.
          </p>
        </StyledTextpageSection>
      </main>
    </>
  );
}
