"use client";
import {
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import { FilePond, registerPlugin } from "react-filepond";

//
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { useState } from "react";

// Register plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export default function CreateCampaign() {
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [images, setImages] = useState();
    const [totalAmmount, setTotalAmmount] = useState();
    const [message, setMessage] = useState();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                py: 6,
                px: { xs: 2, sm: 3, md: 4 },
            }}
        >
            <Card
                sx={{
                    maxWidth: 1000,
                    width: "100%",
                    borderRadius: 4,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(10px)",
                    overflow: "visible",
                    position: "relative",
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: -2,
                        left: -2,
                        right: -2,
                        bottom: -2,
                        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        borderRadius: 4,
                        zIndex: -1,
                        opacity: 0.1,
                    },
                }}
            >
                <CardContent sx={{ p: { xs: 4, sm: 5, md: 6 } }}>
                    {/* Heading */}
                    <Box sx={{ textAlign: "center", mb: 5 }}>
                        <Typography
                            variant="h4"
                            sx={{
                                fontWeight: 700,
                                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                mb: 1,
                                fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.5rem" },
                            }}
                        >
                            Create a New Campaign
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            sx={{
                                color: "text.secondary",
                                fontSize: "1.1rem",
                                fontWeight: 400,
                            }}
                        >
                            Share your story and make an impact
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {/* Title */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Campaign Title"
                                placeholder="Enter campaign title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 2,
                                        backgroundColor: "rgba(255,255,255,0.8)",
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            backgroundColor: "rgba(255,255,255,0.95)",
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#667eea",
                                            },
                                        },
                                        "&.Mui-focused": {
                                            backgroundColor: "#fff",
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#667eea",
                                                borderWidth: 2,
                                            },
                                        },
                                    },
                                    "& .MuiInputLabel-root": {
                                        fontWeight: 600,
                                        "&.Mui-focused": {
                                            color: "#667eea",
                                        },
                                    },
                                    "& .MuiOutlinedInput-input": {
                                        padding: "16px 14px",
                                        fontSize: "1rem",
                                    },
                                }}
                            />
                        </Grid>

                        {/* Description */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Description"
                                placeholder="Write a detailed description..."
                                multiline
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                minRows={4}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 2,
                                        backgroundColor: "rgba(255,255,255,0.8)",
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            backgroundColor: "rgba(255,255,255,0.95)",
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#667eea",
                                            },
                                        },
                                        "&.Mui-focused": {
                                            backgroundColor: "#fff",
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#667eea",
                                                borderWidth: 2,
                                            },
                                        },
                                    },
                                    "& .MuiInputLabel-root": {
                                        fontWeight: 600,
                                        "&.Mui-focused": {
                                            color: "#667eea",
                                        },
                                    },
                                    "& .MuiOutlinedInput-input": {
                                        padding: "16px 14px",
                                        fontSize: "1rem",
                                        lineHeight: 1.6,
                                    },
                                }}
                            />
                        </Grid>

                        {/* Upload Images */}
                        <Grid item xs={12}>
                            <Box sx={{ mb: 2 }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 600,
                                        color: "text.primary",
                                        fontSize: "1.1rem",
                                        mb: 1,
                                    }}
                                >
                                    Upload Campaign Images
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: "text.secondary",
                                        fontSize: "0.9rem",
                                    }}
                                >
                                    Add up to 5 images to showcase your campaign
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    "& .filepond--root": {
                                        borderRadius: 1,
                                        border: "2px solid #ddd",
                                        backgroundColor: "rgba(255,255,255,0.8)",
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            borderColor: "#667eea",
                                            backgroundColor: "rgba(255,255,255,0.95)",
                                        },
                                    },
                                    "& .filepond--drop-label": {
                                        padding: "2rem",
                                        fontSize: "1rem",
                                    },
                                    "& .filepond--label-action": {
                                        color: "#667eea",
                                        fontWeight: 600,
                                        textDecoration: "underline",
                                    },
                                    "& .filepond--panel-root": {
                                        borderRadius: 2,
                                    },
                                    "& .filepond--item-panel": {
                                        backgroundColor: "rgba(255,255,255,0.9)",
                                        borderRadius: 2,
                                    },
                                }}
                            >
                                <FilePond
                                    files={images}
                                    onupdatefiles={setImages}
                                    allowMultiple={true}
                                    maxFiles={5}
                                    credits={false}
                                    labelIdle='Drag & Drop or <span class="filepond--label-action">Browse</span>'
                                />
                            </Box>
                        </Grid>

                        {/* Total Amount */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Target Amount"
                                placeholder="Enter total amount"
                                value={totalAmmount}
                                onChange={(e) => setTotalAmmount(e.target.value)}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 2,
                                        backgroundColor: "rgba(255,255,255,0.8)",
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            backgroundColor: "rgba(255,255,255,0.95)",
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#667eea",
                                            },
                                        },
                                        "&.Mui-focused": {
                                            backgroundColor: "#fff",
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#667eea",
                                                borderWidth: 2,
                                            },
                                        },
                                    },
                                    "& .MuiInputLabel-root": {
                                        fontWeight: 600,
                                        "&.Mui-focused": {
                                            color: "#667eea",
                                        },
                                    },
                                    "& .MuiOutlinedInput-input": {
                                        padding: "16px 14px",
                                        fontSize: "1rem",
                                    },
                                }}
                            />
                        </Grid>

                        {/* Optional Message */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Message (Optional)"
                                placeholder="Write a short message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 2,
                                        backgroundColor: "rgba(255,255,255,0.8)",
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            backgroundColor: "rgba(255,255,255,0.95)",
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#667eea",
                                            },
                                        },
                                        "&.Mui-focused": {
                                            backgroundColor: "#fff",
                                            "& .MuiOutlinedInput-notchedOutline": {
                                                borderColor: "#667eea",
                                                borderWidth: 2,
                                            },
                                        },
                                    },
                                    "& .MuiInputLabel-root": {
                                        fontWeight: 600,
                                        "&.Mui-focused": {
                                            color: "#667eea",
                                        },
                                    },
                                    "& .MuiOutlinedInput-input": {
                                        padding: "16px 14px",
                                        fontSize: "1rem",
                                    },
                                }}
                            />
                        </Grid>

                        {/* Buttons */}
                        <Grid
                            item
                            xs={12}
                            display="flex"
                            justifyContent="flex-end"
                            gap={3}
                            sx={{ mt: 3 }}
                        >
                            <Button
                                variant="outlined"
                                color="secondary"
                                sx={{
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: 2,
                                    fontWeight: 600,
                                    fontSize: "1rem",
                                    textTransform: "none",
                                    borderWidth: 2,
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        borderWidth: 2,
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                                    },
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="contained"
                                sx={{
                                    px: 5,
                                    py: 1.5,
                                    borderRadius: 2,
                                    fontWeight: 600,
                                    fontSize: "1rem",
                                    textTransform: "none",
                                    background:
                                        "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                    boxShadow: "0 4px 15px rgba(102, 126, 234, 0.4)",
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        background:
                                            "linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)",
                                        transform: "translateY(-2px)",
                                        boxShadow: "0 8px 25px rgba(102, 126, 234, 0.6)",
                                    },
                                }}
                            >
                                Create Campaign
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    );
}
