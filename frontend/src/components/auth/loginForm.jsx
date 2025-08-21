"use client";

import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  Paper,
  Avatar,
} from "@mui/material";
import { useState } from "react";
import LockPersonIcon from "@mui/icons-material/LockPerson";
import { FacebookRounded, Google } from "@mui/icons-material";
import Link from "next/link";
import { postApiData } from "@/helper/common";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { login } = useAuth(); // Get login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await postApiData("api/auth/login", {
        email,
        password,
      });
      
      if (result.success === true) {
        // Store user data in auth context with proper structure
        const userData = {
          id: result.user?.id || result.data?.id,
          name: result.user?.name || result.data?.name || result.user?.userName || result.data?.userName,
          email: result.user?.email || result.data?.email || email,
          role: result.user?.role || result.data?.role || 'user', // Default to 'user' if no role specified
          contactNumber: result.user?.contactNumber || result.data?.contactNumber,
          token: result.token || result.data?.token,
          profileImage: result.user?.profileImage || result.data?.profileImage
        };

        // Use the login function from context
        login(userData);
        
        // Store token separately for API calls
        if (userData.token) {
          localStorage.setItem('fundnest-token', userData.token);
        }
        
        toast.success("Login successfully!");
        
        // Redirect to dashboard
        router.push("/dashboard");
        
        setLoading(false);
      } else {
        toast.error(result.message || "Login failed");
        setLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: `url("/crowdfund.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        overflow: "hidden",
        alignItems: "center",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.55)",
          zIndex: 1,
        },
      }}
    >
      <Paper
        elevation={8}
        sx={{
          p: 5,
          width: "100%",
          maxWidth: 420,
          backdropFilter: "blur(12px)",
          background: "rgba(255, 255, 255, 0.15)",
          borderRadius: 4,
          zIndex: 2,
          border: "1px solid rgba(255,255,255,0.3)",
        }}
      >
        <Box textAlign="center" mb={2}>
          <Avatar
            sx={{ bgcolor: "#1976d2", mx: "auto", width: 56, height: 56 }}
          >
            <LockPersonIcon fontSize="medium" />
          </Avatar>
          <Typography
            variant="h5"
            fontWeight={600}
            mt={2}
            color="white"
            letterSpacing={0.5}
          >
            Login to FundNest
          </Typography>
          <Typography variant="body2" color="white" mt={1}>
            Empower your dreams with support 🚀
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            sx={{ 
              input: { color: "white" }, 
              label: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "rgba(255,255,255,0.5)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(255,255,255,0.7)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
            }}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            required
            sx={{ 
              input: { color: "white" }, 
              label: { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "rgba(255,255,255,0.5)",
                },
                "&:hover fieldset": {
                  borderColor: "rgba(255,255,255,0.7)",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{ px: 6, py: 1.5, fontWeight: 600 }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Log In"
              )}
            </Button>
          </Box>

          <Typography
            variant="body2"
            align="center"
            color="white"
            sx={{ mt: 1 }}
          >
            or
          </Typography>

          <Box display={"flex"} justifyContent={"center"} gap={2} mt={2}>
            <Button
              variant="contained"
              startIcon={<FacebookRounded />}
              onClick={() =>
                (window.location.href =
                  "http://localhost:3030/api/user/facebook")
              }
              sx={{
                backgroundColor: "#3b5998",
                color: "white",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#334d84",
                },
              }}
            >
              Facebook
            </Button>
            <Button
              variant="contained"
              startIcon={<Google />}
              onClick={() =>
                (window.location.href = "http://localhost:3030/api/user/google")
              }
              sx={{
                backgroundColor: "#db4437",
                color: "white",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#c33d2e",
                },
              }}
            >
              Google
            </Button>
          </Box>
          <hr style={{ border: "1px solid rgba(255,255,255,0.2)", margin: "20px 0" }} />
          <Typography
            variant="body2"
            align="center"
            mt={3}
            color="white"
            sx={{ fontSize: "0.9rem" }}
          >
            Don't have an account?{" "}
            <Link
              href="/signup"
              style={{
                color: "#90caf9",
                fontWeight: "bold",
                textDecoration: "none",
              }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
}