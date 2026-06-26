import Game from "@/components/Game";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { getGameMode } from "@/lib/gameModes";
import { useRouter } from "next/router";

export default function GamePage() {
  const router = useRouter();
  const mode = getGameMode(router?.query?.mode);

  const { data: session, status } = useSession();

  const isSignedIn = status === "authenticated";
  return (
    <>
      <Head>
        <title>tapping game</title>
      </Head>
      <main>
        <Game mode={mode} isSignedIn={isSignedIn} />
      </main>
    </>
  );
}
