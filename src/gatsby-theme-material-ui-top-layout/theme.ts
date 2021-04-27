import { createMuiTheme } from "@material-ui/core";
import {
  lightBlue,
  indigo,
  pink,
  red,
  deepPurple,
} from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: lightBlue,
    // primary: deepPurple,
    // secondary: pink,
    // error: red,
  },
});

export default theme;
