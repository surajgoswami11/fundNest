import { Container, Grid, Paper, Typography } from "@mui/material";

const InfoSection = () => {
  return (
    <>
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h4"
          fontWeight={600}
          gutterBottom
          textAlign="center"
        >
          Why Choose FundNest?
        </Typography>
        <Grid container spacing={4}>
          {["Fast Setup", "Secure Donations", "Insightful Reports"].map(
            (text) => (
              <Grid item xs={12} md={4} key={text}>
                <Paper elevation={3} sx={{ p: 4 }}>
                  <Typography variant="h6" fontWeight={600}>
                    {text}
                  </Typography>
                  <Typography variant="body2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </Typography>
                </Paper>
              </Grid>
            )
          )}
        </Grid>
      </Container>
    </>
  );
};

export default InfoSection;
