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

export default function HomePage() {
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
              <StyledButtonGreen as={Link} href="/game">
                Play
              </StyledButtonGreen>
              <StyledButton as={Link} href="/how-to-play">
                How to play
              </StyledButton>
            </StyledButtons>
          </StyledButtonSection>
        </StyledWrap>
      </main>
    </>
  );
}
