import { Box, Container, Typography } from "@mui/material";

export default function Feature() {
  return (
    <>
      <Box sx={{ backgroundColor: "#eef3f9", py: 6 }}>
        <Container>
          <Typography
            variant="h5"
            fontWeight={600}
            gutterBottom
            textAlign="center"
          >
            Packed With Powerful features
          </Typography>
          <Typography textAlign="center">
            Track donor history, manage campaigns, and share success stories
            easily.
          </Typography>
        </Container>
      </Box>
    </>
  );
}
