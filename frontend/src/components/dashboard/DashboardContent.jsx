"use client";

import React from "react";
import {
    Box,
    Grid,
    Paper,
    Typography,
    Card,
    CardContent,
    Avatar,
    Chip,
} from "@mui/material";
import {
    ShoppingCart,
    People,
    ShoppingBag,
    PendingActions,
    Cancel,
    CheckCircle,
    TrendingUp,
    Visibility,
    AttachMoney,
} from "@mui/icons-material";
import { useAuth } from "@/context/AuthContext";

// Sample data matching your screenshot
const dashboardData = {
    stats: {
        totalProducts: 6,
        totalUsers: 2,
        totalOrders: 1,
        pendingOrders: 1,
        rejectedOrders: 0,
        deliveredOrders: 0,
    },
    financial: {
        totalSales: 19960.00,
        pendingAmount: 19960.00,
        amountPaid: 0.00,
        averageOrderValue: 19960.00,
    }
};

const StatCard = ({ title, value, icon: Icon, color, bgColor }) => (
    <Card
        sx={{
            borderRadius: 3,
            background: bgColor || `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
            border: `1px solid ${color}30`,
            position: "relative",
            overflow: "hidden",
            "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: `0 8px 25px ${color}25`,
                transition: "all 0.3s ease",
            },
        }}
    >
        <CardContent sx={{ p: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        fontWeight={500}
                        sx={{ mb: 1 }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        variant="h4"
                        fontWeight={700}
                        sx={{
                            color: color,
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5
                        }}
                    >
                        {typeof value === 'number' && (title.includes('Amount') || title.includes('Sales') || title.includes('Value')) ? '₹' : ''}
                        {value}
                        <TrendingUp sx={{ fontSize: 20, ml: 1, opacity: 0.7 }} />
                    </Typography>
                </Box>
                <Avatar
                    sx={{
                        bgcolor: `${color}15`,
                        width: 50,
                        height: 50,
                        border: `2px solid ${color}30`,
                    }}
                >
                    <Icon sx={{ color: color, fontSize: 24 }} />
                </Avatar>
            </Box>
        </CardContent>
    </Card>
);

export default function DashboardContent() {
    const { user } = useAuth();

    const statsConfig = [
        {
            title: "Total Products",
            value: dashboardData.stats.totalProducts,
            icon: ShoppingBag,
            color: "#3b82f6",
            bgColor: "linear-gradient(135deg, #3b82f620 0%, #3b82f610 100%)",
        },
        {
            title: "Total Users",
            value: dashboardData.stats.totalUsers,
            icon: People,
            color: "#10b981",
            bgColor: "linear-gradient(135deg, #10b98120 0%, #10b98110 100%)",
        },
        {
            title: "Total Orders",
            value: dashboardData.stats.totalOrders,
            icon: ShoppingCart,
            color: "#f59e0b",
            bgColor: "linear-gradient(135deg, #f59e0b20 0%, #f59e0b10 100%)",
        },
        {
            title: "Pending Orders",
            value: dashboardData.stats.pendingOrders,
            icon: PendingActions,
            color: "#3b82f6",
            bgColor: "linear-gradient(135deg, #3b82f620 0%, #3b82f610 100%)",
        },
        {
            title: "Rejected Orders",
            value: dashboardData.stats.rejectedOrders,
            icon: Cancel,
            color: "#ef4444",
            bgColor: "linear-gradient(135deg, #ef444420 0%, #ef444410 100%)",
        },
        {
            title: "Delivered Orders",
            value: dashboardData.stats.deliveredOrders,
            icon: CheckCircle,
            color: "#10b981",
            bgColor: "linear-gradient(135deg, #10b98120 0%, #10b98110 100%)",
        },
    ];

    const financialStats = [
        {
            title: "Total Sales",
            value: dashboardData.financial.totalSales.toFixed(2),
            icon: AttachMoney,
            color: "#6366f1",
        },
        {
            title: "Total Pending Amount",
            value: dashboardData.financial.pendingAmount.toFixed(2),
            icon: PendingActions,
            color: "#f59e0b",
        },
        {
            title: "Total Amount Paid",
            value: dashboardData.financial.amountPaid.toFixed(2),
            icon: CheckCircle,
            color: "#10b981",
        },
        {
            title: "Average OrderValue",
            value: dashboardData.financial.averageOrderValue.toFixed(2),
            icon: TrendingUp,
            color: "#8b5cf6",
        },
    ];

    return (
        <Box sx={{ p: 3 }}>
            {/* Welcome Header - Matches your screenshot */}
            <Box
                sx={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    borderRadius: 4,
                    p: 4,
                    mb: 4,
                    color: "white",
                    position: "relative",
                    overflow: "hidden",
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        right: 0,
                        width: "200px",
                        height: "200px",
                        background: "rgba(255,255,255,0.1)",
                        borderRadius: "50%",
                        transform: "translate(50px, -50px)",
                    },
                }}
            >
                <Typography variant="h4" fontWeight={700} sx={{ mb: 1 }}>
                    Welcome to the {user?.role === 'admin' ? 'admin' : 'dashboard'}!
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                    Here's what's happening with your {user?.role === 'admin' ? 'platform' : 'account'} today.
                </Typography>
            </Box>

            {/* Stats Grid - Matches your screenshot layout */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {statsConfig.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <StatCard {...stat} />
                    </Grid>
                ))}
            </Grid>

            {/* Financial Stats */}
            <Typography variant="h5" fontWeight={600} sx={{ mb: 3, color: "text.primary" }}>
                Financial Overview
            </Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {financialStats.map((stat, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <StatCard {...stat} />
                    </Grid>
                ))}
            </Grid>

            {/* Orders Section - Matches your screenshot */}
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    borderRadius: 3,
                    border: "1px solid #e5e7eb",
                    background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)",
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Typography variant="h6" fontWeight={600}>
                        Orders
                    </Typography>
                    <Chip
                        label="View All"
                        color="primary"
                        variant="outlined"
                        clickable
                        icon={<Visibility />}
                        sx={{ fontWeight: 600 }}
                    />
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        py: 6,
                        color: "text.secondary",
                    }}
                >
                    <Typography variant="body1">
                        No orders to display yet. Start by creating your first campaign!
                    </Typography>
                </Box>
            </Paper>
        </Box>
    );
}