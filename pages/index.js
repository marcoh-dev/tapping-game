import Game from "@/components/Game";
import Head from "next/head";

export default function HomePage() {
  return (
    <>
      <Head>
        <title>tapping game</title>
      </Head>
      <main>
        <Game />
      </main>
    </>
  );
}
