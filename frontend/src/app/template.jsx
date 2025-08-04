import { Box, CssBaseline } from "@mui/material";
import Sidebar from "@/components/dashboard/Sidebar";
const DashboardTemplate = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#f5f7fa",
          minHeight: "100vh",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
