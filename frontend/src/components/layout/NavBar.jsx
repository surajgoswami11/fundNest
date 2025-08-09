import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";

const Navbar = () => {
  return (
    <>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h5" sx={{ fontWeight: "600" }}>
            FundNest
          </Typography>
          <Box>
            <Button color="inherit" variant="outlined" sx={{ m: 1 }}>
              Home
            </Button>
            <Button color="inherit" variant="outlined" sx={{ m: 1 }}>
              About
            </Button>
            {/* new commit  */}
            <Link href="/login">
              <Button color="primary" variant="contained" sx={{ m: 1 }}>
                Login
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
