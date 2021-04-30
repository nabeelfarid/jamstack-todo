import React, { createContext, useEffect, useState } from "react";
import netlifyIdentity from "netlify-identity-widget";
import { client as apolloClient } from "./ApolloClientProvider";

interface IIdentityContext {
  user: netlifyIdentity.User | null;
  identity: typeof netlifyIdentity;
}

export const IdentityContext = createContext<IIdentityContext>({
  user: null,
  identity: netlifyIdentity,
});

interface IdentityContextProviderProps {}

const IdentityContextProvider: React.FC<IdentityContextProviderProps> = (
  props
) => {
  const [user, setUser] = useState<netlifyIdentity.User>();

  useEffect(() => {
    netlifyIdentity.init({});
  }, []);

  netlifyIdentity.on("init", (user) => {
    console.log("Initialise Netlify Idenity");
  });

  netlifyIdentity.on("login", (user) => {
    console.log("logging in");
    netlifyIdentity.close();
    setUser(user);
  });

  netlifyIdentity.on("logout", () => {
    console.log("logging out");
    netlifyIdentity.close();
    setUser(null);
    apolloClient.cache.reset();
  });

  return (
    <IdentityContext.Provider value={{ user: user, identity: netlifyIdentity }}>
      {props.children}
    </IdentityContext.Provider>
  );
};

export default IdentityContextProvider;
