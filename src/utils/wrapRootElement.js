import React from "react";
import IdentityContextProvider from "./IdentityContextProvider";
import ApolloClientProvider from "./ApolloClientProvider";

export const wrapRootElement = ({ element }) => {
  console.info(`inside wrapRootElement`);
  return (
    <IdentityContextProvider>
      <ApolloClientProvider>{element}</ApolloClientProvider>
    </IdentityContextProvider>
  );
};
