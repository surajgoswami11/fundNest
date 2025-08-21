"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

export default function AuthWrapper({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Only redirect if we're done loading and no user is found
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    // Show loading spinner while checking authentication
    if (loading) {
        return (
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                sx={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                }}
            >
                <CircularProgress 
                    size={60} 
                    sx={{ 
                        color: "white",
                        mb: 2 
                    }} 
                />
                <Typography 
                    variant="h6" 
                    sx={{ 
                        color: "white",
                        fontWeight: 500 
                    }}
                >
                    Loading FundNest...
                </Typography>
                <Typography 
                    variant="body2" 
                    sx={{ 
                        color: "rgba(255,255,255,0.8)",
                        mt: 1 
                    }}
                >
                    Please wait while we verify your session
                </Typography>
            </Box>
        );
    }

    // Show loading if user is not authenticated (will redirect)
    if (!user) {
        return (
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                sx={{
                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                }}
            >
                <CircularProgress 
                    size={60} 
                    sx={{ 
                        color: "white",
                        mb: 2 
                    }} 
                />
                <Typography 
                    variant="h6" 
                    sx={{ 
                        color: "white",
                        fontWeight: 500 
                    }}
                >
                    Redirecting to Login...
                </Typography>
            </Box>
        );
    }

    // Render children if user is authenticated
    return <>{children}</>;
}