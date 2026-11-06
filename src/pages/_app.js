import { SWRConfig } from "swr";
import GlobalStyle from "../styles";
import { SessionProvider } from "next-auth/react";

const fetcher = async (resource, init) => {
  const result = await fetch(resource, init);

  if (!result.ok) {
    const error = new Error("An error occurred while fetching the data.");
    error.info = await result.json();
    error.status = result.status;
    throw error;
  }

  return result.json();
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <>
      <GlobalStyle />
      <SWRConfig value={{ fetcher }}>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </SWRConfig>
    </>
  );
}
