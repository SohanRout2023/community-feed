import { useEffect } from "react";
import { useRouter } from "next/router";
import { ApolloProvider } from "@apollo/client";
import client from "./client";
import NavBar from "./NavBar";

import "../styles/globals.css"; // Global CSS

function MyApp({ Component, pageProps }) {


  return (
    <ApolloProvider client={client}>
      <NavBar />
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
