import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { client } from "../service/apolo";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import "../styles/globals.css";
import { Wrapper } from "../components/Wrapper";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ApolloProvider client={client}>
        <Navbar />
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
        <Footer />
      </ApolloProvider>
    </>
  );
}
