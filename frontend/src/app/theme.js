"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1e88e5", // blue
    },
    secondary: {
      main: "#43a047", // green
    },
    background: {
      default: "#f5f5f5",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: ` "Winky Rough" "Roboto, sans-serif"`,
  },
});

export default theme;
