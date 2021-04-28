import React from "react";
import ThemeTopLayout from "gatsby-theme-material-ui-top-layout/src/components/top-layout";
import IdentityContextProvider from "../../../IdentityContextProvider";

export const ThemeContext = React.createContext(null);

export default function TopLayout({ children, theme }) {
  // const [themeState, toggleThemeState] = useState(
  //   localStorage.getItem("theme") === "light" ? false : true
  // );
  console.log("hello from top layout...");

  // const toggleTheme = () => {
  //   toggleThemeState((t) => !t);
  //   localStorage.setItem("theme", themeState ? "light" : "dark");
  // };

  return (
    <IdentityContextProvider>
      {/* <ThemeContext.Provider value={{ toggleTheme }}> */}
      <ThemeTopLayout
        // theme={createMuiTheme({
        //   palette: {
        //     type: themeState ? "dark" : "light",
        //     primary: lightBlue,
        //   },
        // })}
        theme={theme}
      >
        {children}
      </ThemeTopLayout>
      {/* </ThemeContext.Provider> */}
    </IdentityContextProvider>
  );
}
