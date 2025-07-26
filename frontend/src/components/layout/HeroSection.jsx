import { Box, Container, Typography, Button } from "@mui/material";

export default function HeroSection() {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "#f9f9ff",
          py: 10,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" fontWeight={700} gutterBottom>
            Simplify Your Fundraising Experience
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            {" "}
            Manage donations, supporters, and impact — all in one place.
          </Typography>
          <Button variant="contained">Get Started</Button>
        </Container>
      </Box>
    </>
  );
}
