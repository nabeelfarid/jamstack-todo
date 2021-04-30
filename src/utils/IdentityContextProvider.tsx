import React, { createContext, useEffect, useState } from "react";
import netlifyIdentity from "netlify-identity-widget";
import { client as apolloClient } from "./ApolloClientProvider";

export const IsAuthenticated = (): boolean => {
  console.log("local storage user ", localStorage.getItem("gotrue.user"));
  return !!localStorage.getItem("gotrue.user");
};

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
    console.log("Initialising Netlify Idenity inside UseEffect");
    netlifyIdentity.init({});
  }, []);

  netlifyIdentity.on("init", (user) => {
    console.log("Initialised Netlify Idenity");
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
