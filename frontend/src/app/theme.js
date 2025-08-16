// src/theme.js
import { createTheme } from "@mui/material/styles";

export default function getTheme() {
  return createTheme({
    palette: {
      primary: {
        main: "#4361ee",
      },
      secondary: {
        main: "#3f37c9",
      },
      success: {
        main: "#4cc9f0",
      },
      warning: {
        main: "#f72585",
      },
      background: {
        default: "#f5f7fb",
        paper: "#ffffff",
      },
    },
    typography: {
      fontFamily: [
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "sans-serif",
      ].join(","),
      h4: {
        fontWeight: 700,
      },
      h5: {
        fontWeight: 600,
      },
      subtitle2: {
        fontWeight: 500,
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "10px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
            transition: "transform 0.3s, box-shadow 0.3s",
            "&:hover": {
              boxShadow: "0 6px 16px rgba(0, 0, 0, 0.12)",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
          },
        },
      },
    },
  });
}
