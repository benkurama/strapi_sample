"use client";

import { HttpLink, SuspenseCache, ApolloLink } from "@apollo/client";
import {
  NextSSRApolloClient,
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

//const STRAPI_URL = process.env.STRAPI_URL || "http://localhost:1338";
export function makeClient() {
  // const httpLink = new HttpLink({
  //   uri: `${STRAPI_URL}/graphql`,
  // });

  const httpLink = new HttpLink({
    uri: "http://localhost:1338/graphql",
  });
  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            httpLink,
          ])
        : httpLink,
  });
}

function makeSuspenseCache() {
  return new SuspenseCache();
}

export  function ApolloWrapper({ children }) {
  return (
    <ApolloNextAppProvider
      makeClient={makeClient}
       makeSuspenseCache={makeSuspenseCache}
    >
      {children}
    </ApolloNextAppProvider>
  );
}