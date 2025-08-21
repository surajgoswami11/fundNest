"use client";

import React, { useState } from "react";
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Box,
    Collapse,
    Avatar,
    Divider,
    useTheme,
} from "@mui/material";
import {
    Dashboard,
    People,
    Campaign,
    ExpandLess,
    ExpandMore,
    DocumentScanner,
    UploadFile,
    Timelapse,
    Visibility,
    Create,
} from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const DRAWER_WIDTH = 280;

// Menu items matching your MenuItem.js structure
const menuItems = [
    {
        id: "dashboard",
        title: "Dashboard",
        icon: Dashboard,
        href: "/dashboard",
        roles: ["admin", "user"],
    },
    {
        id: "users",
        title: "Users",
        icon: People,
        href: "/dashboard/users",
        roles: ["admin"], // Only admin can see users
    },
    {
        id: "kyc",
        title: "KYC Documents",
        icon: DocumentScanner,
        roles: ["admin", "user"],
        children: [
            {
                id: "upload-docs",
                title: "Upload Documents",
                icon: UploadFile,
                href: "/dashboard/documents/upload-document",
                roles: ["user"], // Only users upload documents
            },
            {
                id: "view-docs",
                title: "View Documents",
                icon: Visibility,
                href: "/dashboard/documents/view-document",
                roles: ["admin", "user"],
            },
            {
                id: "kyc-status",
                title: "KYC Status",
                icon: Timelapse,
                href: "/dashboard/documents/kyc-status",
                roles: ["admin", "user"],
            },
        ],
    },
    {
        id: "campaign",
        title: "Campaign Management",
        icon: Campaign,
        roles: ["admin", "user"],
        children: [
            {
                id: "create-campaign",
                title: "Create Campaign",
                icon: Create,
                href: "/dashboard/campaign/create",
                roles: ["user"], // Only users create campaigns
            },
            {
                id: "view-campaign",
                title: "View Campaigns",
                icon: Visibility,
                href: "/dashboard/campaign/view",
                roles: ["admin", "user"],
            },
        ],
    },
];

export default function Sidebar({ open, onClose }) {
    const [expandedItems, setExpandedItems] = useState({});
    const { user } = useAuth();
    const router = useRouter();
    const theme = useTheme();

    const handleItemClick = (item) => {
        if (item.children) {
            setExpandedItems((prev) => ({
                ...prev,
                [item.id]: !prev[item.id],
            }));
        } else if (item.href) {
            router.push(item.href);
            if (onClose) onClose(); // Close sidebar on mobile after navigation
        }
    };

    const hasPermission = (roles) => {
        return roles.includes(user?.role || "user");
    };

    const renderMenuItem = (item, level = 0) => {
        if (!hasPermission(item.roles)) return null;

        const Icon = item.icon;
        const isExpanded = expandedItems[item.id];
        const hasChildren = item.children && item.children.length > 0;
        const isCurrentPage = item.href === router.pathname;

        return (
            <React.Fragment key={item.id}>
                <ListItem disablePadding sx={{ display: "block" }}>
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: "initial",
                            px: 2.5,
                            py: 1.2,
                            pl: level === 0 ? 2.5 : 4.5,
                            borderRadius: "12px",
                            mx: 1,
                            mb: 0.5,
                            backgroundColor: level === 0 ? "transparent" : "rgba(255,255,255,0.05)",
                            "&:hover": {
                                backgroundColor: theme.palette.primary.light,
                                color: "white",
                                "& .MuiListItemIcon-root": {
                                    color: "white",
                                },
                            },
                            ...(isCurrentPage && {
                                backgroundColor: theme.palette.primary.main,
                                color: "white",
                                "&:hover": {
                                    backgroundColor: theme.palette.primary.dark,
                                },
                                "& .MuiListItemIcon-root": {
                                    color: "white",
                                },
                            }),
                        }}
                        onClick={() => handleItemClick(item)}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: 2,
                                justifyContent: "center",
                                color: level === 0 ? theme.palette.primary.main : "inherit",
                            }}
                        >
                            <Icon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText
                            primary={item.title}
                            primaryTypographyProps={{
                                fontSize: level === 0 ? "0.9rem" : "0.85rem",
                                fontWeight: level === 0 ? 600 : 500,
                            }}
                        />
                        {hasChildren && (
                            isExpanded ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />
                        )}
                    </ListItemButton>
                </ListItem>

                {hasChildren && (
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {item.children.map((child) => renderMenuItem(child, 1))}
                        </List>
                    </Collapse>
                )}
            </React.Fragment>
        );
    };

    return (
        <Drawer
            variant="persistent"
            anchor="left"
            open={open}
            sx={{
                width: DRAWER_WIDTH,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: DRAWER_WIDTH,
                    boxSizing: "border-box",
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    borderRight: "none",
                    boxShadow: "4px 0 20px rgba(0,0,0,0.1)",
                },
            }}
        >
            {/* Header Section - Matches your screenshot */}
            <Box
                sx={{
                    p: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                    background: "rgba(255,255,255,0.1)",
                }}
            >
                <Avatar
                    sx={{
                        width: 45,
                        height: 45,
                        bgcolor: "rgba(255,255,255,0.2)",
                        border: "2px solid rgba(255,255,255,0.3)",
                        fontSize: "1.2rem",
                        fontWeight: 600,
                    }}
                >
                    E
                </Avatar>
                <Box>
                    <Typography variant="h6" fontWeight={700} sx={{ fontSize: "1.1rem" }}>
                        Emaavy
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8, fontSize: "0.75rem" }}>
                        Emaavy Portal
                    </Typography>
                </Box>
            </Box>

            {/* User Info */}
            <Box sx={{ p: 2, backgroundColor: "rgba(255,255,255,0.05)" }}>
                <Box display="flex" alignItems="center" gap={1.5}>
                    <Avatar
                        sx={{
                            width: 35,
                            height: 35,
                            bgcolor: "rgba(255,255,255,0.2)",
                            fontSize: "0.9rem",
                        }}
                    >
                        {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "U"}
                    </Avatar>
                    <Box>
                        <Typography variant="body2" fontWeight={600} sx={{ fontSize: "0.85rem" }}>
                            {user?.name || user?.email || "User"}
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.7, fontSize: "0.7rem" }}>
                            {user?.role === "admin" ? "Administrator" : "User"}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Divider sx={{ borderColor: "rgba(255,255,255,0.1)" }} />

            {/* Navigation Menu */}
            <Box sx={{ flexGrow: 1, py: 2 }}>
                <List>
                    {menuItems.map((item) => renderMenuItem(item))}
                </List>
            </Box>

            {/* Footer */}
            <Box
                sx={{
                    p: 2,
                    borderTop: "1px solid rgba(255,255,255,0.1)",
                    backgroundColor: "rgba(255,255,255,0.05)",
                }}
            >
                <Typography variant="caption" sx={{ opacity: 0.7, fontSize: "0.7rem" }}>
                    © 2025 Emaavy Portals
                </Typography>
            </Box>
        </Drawer>
    );
}