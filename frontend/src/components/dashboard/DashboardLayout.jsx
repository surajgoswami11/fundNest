"use client";

import React, { useState } from "react";
import { Box, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function DashboardLayout({ children }) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

    const handleSidebarToggle = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <Box sx={{ display: "flex", minHeight: "100vh" }}>
            <Navbar
                onMenuClick={handleSidebarToggle}
                sidebarOpen={sidebarOpen}
            />
            <Sidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    width: sidebarOpen ? "calc(100% - 280px)" : "100%",
                    minHeight: "100vh",
                    bgcolor: "#f8fafc",
                    transition: theme.transitions.create("width", {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                    overflow: "hidden", // Prevent horizontal scroll
                }}
            >
                <Toolbar sx={{ minHeight: 64 }} />
                <Box sx={{
                    height: "calc(100vh - 64px)",
                    overflowY: "auto",
                    overflowX: "hidden",
                }}>
                    {children}
                </Box>
            </Box>
        </Box>
    );
}