"use client";
import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Stack,
  Divider,
} from "@mui/material";
const MetricCard = ({ title, value }) => (
  <Grid item xs={12} sm={6} md={3}>
    <Card sx={{ minHeight: "100%" }}>
      <CardContent>
        <Typography variant="subtitle2" color="textSecondary">
          {title}
        </Typography>
        <Typography variant="h4">{value}</Typography>
      </CardContent>
    </Card>
  </Grid>
);
const Dashboard = () => {
  const stats = {
    products: 5,
    users: 2,
    orders: 1,
    emergency: 0,
    sales: "19960.00",
    pendingAmount: "19960.00",
    paidAmount: "0.00",
    avgOrder: "19960.00",
  };
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Welcome to the admin!
      </Typography>
      <Grid container spacing={3}>
        <MetricCard title="Total Products" value={stats.products} />
        <MetricCard title="Total Users" value={stats.users} />
        <MetricCard title="Total Orders" value={stats.orders} />

        {/* Emergency Portal Card - takes half width on medium screens and up */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Emergency Portal
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                <strong>Fundnest Portal:</strong> Streamlining eCommerce for
                effortless product management.
              </Typography>
              <Stack spacing={1} divider={<Divider />}>
                <Typography>Pending Orders</Typography>
                <Typography>Rejected Orders</Typography>
                <Typography>Delivered Orders</Typography>
              </Stack>
              <Typography variant="h2" textAlign="center" sx={{ mt: 3 }}>
                {stats.emergency}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Right column with 4 metric cards in a grid */}
        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" color="textSecondary">
                    Total Sales
                  </Typography>
                  <Typography variant="h4">{stats.sales}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" color="textSecondary">
                    Total Pending Amount
                  </Typography>
                  <Typography variant="h4">{stats.pendingAmount}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" color="textSecondary">
                    Total Amount Paid
                  </Typography>
                  <Typography variant="h4">{stats.paidAmount}</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle2" color="textSecondary">
                    Average Order Value
                  </Typography>
                  <Typography variant="h4">{stats.avgOrder}</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Dashboard;
