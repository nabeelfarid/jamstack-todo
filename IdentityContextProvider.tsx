import React, { createContext, useEffect, useState } from "react";
import netlifyIdentity from "netlify-identity-widget";

interface IIdentityContext {
  user: netlifyIdentity.User | null;
  identity: typeof netlifyIdentity;
  loginCompleted: boolean;
}

export const IdentityContext = createContext<IIdentityContext>({
  user: null,
  identity: netlifyIdentity,
  loginCompleted: false,
});

interface IdentityContextProviderProps {}

const IdentityContextProvider: React.FC<IdentityContextProviderProps> = (
  props
) => {
  const [user, setUser] = useState<netlifyIdentity.User>();
  // loginComleted flag to check if the login process is executing while the User object is null
  // This is useful when user refreshes the page even when he is logged in ,
  // In such a case, while the page is refreshing to automatically login the user,
  // the user object still shows up as null in page's useEffect hook
  // and needs to wait before making a decision to redirect until the login process has completed
  const [loginCompleted, setLoginCompleted] = useState<boolean>(false);

  useEffect(() => {
    netlifyIdentity.init({});
  }, []);

  netlifyIdentity.on("login", (user) => {
    console.log("logging in");
    netlifyIdentity.close();
    setUser(user);
  });

  netlifyIdentity.on("logout", () => {
    console.log("logging out");
    netlifyIdentity.close();
    setUser(null);
    setLoginCompleted(true);
  });

  return (
    <IdentityContext.Provider
      value={{ user: user, identity: netlifyIdentity, loginCompleted }}
    >
      {props.children}
    </IdentityContext.Provider>
  );
};

export default IdentityContextProvider;
