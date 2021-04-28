import React, { createContext, useEffect, useState } from "react";
import netlifyIdentity from "netlify-identity-widget";

interface IIdentityContext {
  user: netlifyIdentity.User;
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

  netlifyIdentity.on("login", (user) => {
    console.log("inside login");
    netlifyIdentity.close();
    setUser(user);
  });

  netlifyIdentity.on("logout", () => {
    netlifyIdentity.close();
    setUser(null);
  });

  return (
    <IdentityContext.Provider value={{ user: user, identity: netlifyIdentity }}>
      {props.children}
    </IdentityContext.Provider>
  );
};

export default IdentityContextProvider;
