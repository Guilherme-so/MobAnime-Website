import Head from "next/head";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { ApolloProvider } from "@apollo/client";
import { client } from "../service/apolo";
import { Wrapper } from "../components/Wrapper";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <RecoilRoot>
        <ApolloProvider client={client}>
          <Wrapper>
            <Component {...pageProps} />
          </Wrapper>
        </ApolloProvider>
      </RecoilRoot>
    </>
  );
}
