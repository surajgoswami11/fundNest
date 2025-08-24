"use client";

import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Box,
    Badge,
    Tooltip,
} from "@mui/material";
import {
    AccountCircle,
    Settings,
    Logout,
    Menu as MenuIcon,
    LockReset,
    Notifications,
    DarkMode,
    LightMode,
    HelpOutline,
} from "@mui/icons-material";
import { useAuth } from "@/context/AuthContext";

const DRAWER_WIDTH = 280;

export default function Navbar({ onMenuClick, sidebarOpen }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [notificationAnchor, setNotificationAnchor] = useState(null);
    const { user, logout } = useAuth();



    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setAnchorEl(null);
    };

    const handleNotificationOpen = (event) => {
        setNotificationAnchor(event.currentTarget);
    };

    const handleNotificationClose = () => {
        setNotificationAnchor(null);
    };

    const handleLogout = () => {
        handleProfileMenuClose();
        logout();
    };

    const getInitials = (name) => {
        if (!name) return "U";
        return name
            .split(" ")
            .map(word => word.charAt(0))
            .join("")
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <>
            <AppBar
                position="fixed"
                elevation={1}
                sx={{
                    width: sidebarOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : "100%",
                    ml: sidebarOpen ? `${DRAWER_WIDTH}px` : 0,
                    transition: (theme) =>
                        theme.transitions.create(["width", "margin"], {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.leavingScreen,
                        }),
                    bgcolor: "white",
                    color: "text.primary",
                    borderBottom: "1px solid #e0e0e0",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
            >
                <Toolbar sx={{ minHeight: 64 }}>
                    {!sidebarOpen && (
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={onMenuClick}
                            edge="start"
                            sx={{
                                mr: 2,
                                color: "primary.main",
                                "&:hover": {
                                    bgcolor: "primary.light",
                                    color: "white",
                                }
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" component="div" fontWeight={600} color="primary.main">
                            Dashboard
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {new Date().toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            })}
                        </Typography>
                    </Box>

                    {user && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            {/* Help Button */}
                            <Tooltip title="Help & Support">
                                <IconButton
                                    color="inherit"
                                    sx={{
                                        color: "text.secondary",
                                        "&:hover": {
                                            color: "primary.main",
                                            bgcolor: "primary.light",
                                        }
                                    }}
                                >
                                    <HelpOutline />
                                </IconButton>
                            </Tooltip>

                            {/* Notifications */}
                            <Tooltip title="Notifications">
                                <IconButton
                                    color="inherit"
                                    onClick={handleNotificationOpen}
                                    sx={{
                                        color: "text.secondary",
                                        "&:hover": {
                                            color: "warning.main",
                                            bgcolor: "warning.light",
                                        }
                                    }}
                                >
                                    <Badge badgeContent={3} color="error">
                                        <Notifications />
                                    </Badge>
                                </IconButton>
                            </Tooltip>

                            {/* User Info and Avatar */}
                            <Box sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                ml: 2,
                                pl: 2,
                                borderLeft: "1px solid #e0e0e0"
                            }}>
                                <Box sx={{ display: { xs: "none", md: "block" }, textAlign: "right" }}>
                                    <Typography variant="body2" fontWeight={600} color="text.primary">
                                        {user.name || "User"}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {user.role === "admin" ? "Administrator" : "User"}
                                    </Typography>
                                </Box>

                                <Tooltip title="Profile Menu">
                                    <IconButton
                                        size="large"
                                        aria-label="account of current user"
                                        aria-controls="profile-menu"
                                        aria-haspopup="true"
                                        onClick={handleProfileMenuOpen}
                                        sx={{
                                            p: 0,
                                            "&:hover": {
                                                transform: "scale(1.05)",
                                            }
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                width: 40,
                                                height: 40,
                                                bgcolor: "primary.main",
                                                fontSize: "0.9rem",
                                                border: "2px solid",
                                                borderColor: "primary.light",
                                            }}
                                        >
                                            {user.profileImage ? (
                                                <img
                                                    src={user.profileImage}
                                                    alt="Profile"
                                                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                                />
                                            ) : (
                                                getInitials(user.name || user.email)
                                            )}
                                        </Avatar>
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>
                    )}
                </Toolbar>
            </AppBar>

            {/* Notifications Menu */}
            <Menu
                id="notification-menu"
                anchorEl={notificationAnchor}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(notificationAnchor)}
                onClose={handleNotificationClose}
                PaperProps={{
                    sx: {
                        mt: 1,
                        minWidth: 320,
                        maxWidth: 360,
                        borderRadius: 2,
                        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                    },
                }}
            >
                <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
                    <Typography variant="h6" fontWeight={600}>
                        Notifications
                    </Typography>
                </Box>

                <MenuItem onClick={handleNotificationClose}>
                    <ListItemText
                        primary="New campaign approval"
                        secondary="Educational fundraiser needs review"
                        primaryTypographyProps={{ fontWeight: 500 }}
                    />
                </MenuItem>

                <MenuItem onClick={handleNotificationClose}>
                    <ListItemText
                        primary="Payment received"
                        secondary="₹5,000 donation from anonymous donor"
                        primaryTypographyProps={{ fontWeight: 500 }}
                    />
                </MenuItem>

                <MenuItem onClick={handleNotificationClose}>
                    <ListItemText
                        primary="KYC verification"
                        secondary="Document verification completed"
                        primaryTypographyProps={{ fontWeight: 500 }}
                    />
                </MenuItem>
            </Menu>

            {/* Profile Menu */}
            <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorEl)}
                onClose={handleProfileMenuClose}
                PaperProps={{
                    sx: {
                        mt: 1,
                        minWidth: 220,
                        borderRadius: 2,
                        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                        "& .MuiMenuItem-root": {
                            py: 1.5,
                            px: 2,
                            borderRadius: 1,
                            mx: 1,
                            my: 0.5,
                            "&:hover": {
                                bgcolor: "primary.light",
                                color: "primary.contrastText",
                                "& .MuiListItemIcon-root": {
                                    color: "primary.contrastText",
                                }
                            }
                        }
                    },
                }}
            >
                {/* User Info Header */}
                <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
                    <Typography variant="body1" fontWeight={600}>
                        {user?.name || user?.email || "User"}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {user?.email}
                    </Typography>
                </Box>

                <MenuItem onClick={handleProfileMenuClose}>
                    <ListItemIcon>
                        <AccountCircle fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText
                        primary="My Profile"
                        primaryTypographyProps={{ fontWeight: 500 }}
                    />
                </MenuItem>

                <MenuItem onClick={handleProfileMenuClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" color="info" />
                    </ListItemIcon>
                    <ListItemText
                        primary="Settings"
                        primaryTypographyProps={{ fontWeight: 500 }}
                    />
                </MenuItem>

                <MenuItem onClick={handleProfileMenuClose}>
                    <ListItemIcon>
                        <LockReset fontSize="small" color="warning" />
                    </ListItemIcon>
                    <ListItemText
                        primary="Change Password"
                        primaryTypographyProps={{ fontWeight: 500 }}
                    />
                </MenuItem>

                <Divider sx={{ my: 1 }} />

                <MenuItem
                    onClick={handleLogout}
                    sx={{
                        "&:hover": {
                            bgcolor: "error.light",
                            color: "error.contrastText",
                            "& .MuiListItemIcon-root": {
                                color: "error.contrastText",
                            }
                        }
                    }}
                >
                    <ListItemIcon>
                        <Logout fontSize="small" color="error" />
                    </ListItemIcon>
                    <ListItemText
                        primary="Logout"
                        primaryTypographyProps={{ fontWeight: 500 }}
                    />
                </MenuItem>
            </Menu>
        </>
    );
}