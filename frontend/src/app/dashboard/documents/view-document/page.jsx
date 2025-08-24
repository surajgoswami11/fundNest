"use client";

import {
    FormLabel,
    Paper,
    TextField,
    Typography,
    Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";

// FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { getWithToken, postApiFormDataToken } from "@/helper/common";
import { toast } from "react-toastify";
import StickyHeadTable from "@/components/listing/StickyHeadTable";

// Register plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export default function ViewDocument() {


    // 
    const [userKyc, setUserKyc] = useState([])
    const [adminKyc, setadminKyc] = useState([])

    const parseUser = JSON.parse(localStorage.getItem("fundnest-user") || "{}")

    //
    const formRowStyle = {
        display: "flex",
        gap: "24px",
        marginBottom: "32px",
        flexWrap: "wrap",
    };

    const halfWidthBox = {
        flex: "1 1 45%",
        minWidth: "300px",
    };


    const getKycDocuments = async () => {
        if (parseUser.role === "admin") {
            const res = await getWithToken("api/user/kyc-documents")
            console.log(res, "this is admin role data")
            setadminKyc(res?.kyc)


        } else {
            const res = await getWithToken("api/user/myKyc")
            console.log(res, "simple response")
            setUserKyc(res.findKyc)
        }


    }

    useEffect(() => {
        getKycDocuments()
    }, [])


    return (

        <>
            {
                parseUser.role === "user" && userKyc && (
                    <Paper
                        elevation={4}
                        style={{
                            padding: "40px",
                            margin: "40px auto",
                            maxWidth: "1100px",
                            borderRadius: "16px",
                            backgroundColor: "#f9f9f9",
                        }}
                    >
                        {/* bank details */}
                        <Box sx={formRowStyle}>
                            <Box sx={halfWidthBox}>
                                <FormLabel>Account Holder Name</FormLabel>
                                <TextField
                                    fullWidth
                                    size="small"
                                    margin="dense"
                                    placeholder="As Per Documents"
                                    value={userKyc?.accountHolderName}
                                    disabled
                                />
                            </Box>
                            <Box sx={halfWidthBox}>
                                <FormLabel>Enter Bank Name</FormLabel>
                                <TextField
                                    fullWidth
                                    size="small"
                                    margin="dense"
                                    placeholder="Enter Bank Name"
                                    value={userKyc?.bankName}
                                    disabled
                                />
                            </Box>
                        </Box>
                        {/* IFSc */}
                        <Box sx={formRowStyle}>
                            <Box sx={halfWidthBox}>
                                <FormLabel>Enter IFSC Number</FormLabel>
                                <TextField
                                    fullWidth
                                    size="small"
                                    margin="dense"
                                    value={userKyc?.IFSC}
                                    disabled
                                />
                            </Box>
                            <Box sx={halfWidthBox}>
                                <FormLabel>Branch Name</FormLabel>
                                <TextField
                                    fullWidth
                                    size="small"
                                    margin="dense"
                                    disabled
                                    value={userKyc?.branchName}
                                />
                            </Box>
                        </Box>

                        {/* Account No + Passbook */}
                        <Box sx={formRowStyle}>
                            <Box sx={halfWidthBox}>
                                <FormLabel>Account Number</FormLabel>
                                <TextField
                                    fullWidth
                                    size="small"
                                    margin="dense"
                                    disabled
                                    value={userKyc?.accountNo}
                                />
                            </Box>
                            <Box sx={halfWidthBox}>
                                <FormLabel>Upload Passbook Image</FormLabel>
                                <FilePond
                                    files={userKyc?.passbookImage}
                                    credits={false}

                                />
                            </Box>
                        </Box>

                        {/* Aadhar No + Aadhar Image */}
                        <Box sx={formRowStyle}>
                            <Box sx={halfWidthBox}>
                                <FormLabel>Aadhar Number</FormLabel>
                                <TextField
                                    fullWidth
                                    size="small"
                                    margin="dense"
                                    disabled
                                    value={userKyc?.aadharNo}

                                />
                            </Box>
                            <Box sx={halfWidthBox}>
                                <FormLabel>Upload Aadhar Image</FormLabel>
                                <FilePond
                                    files={userKyc?.aadharImage}
                                    credits={false}
                                />
                            </Box>
                        </Box>

                        {/* PAN No + PAN Image */}
                        <Box sx={formRowStyle}>
                            <Box sx={halfWidthBox}>
                                <FormLabel>PAN Number</FormLabel>
                                <TextField
                                    fullWidth
                                    size="small"
                                    margin="dense"
                                    value={userKyc?.panNo}
                                    disabled
                                />
                            </Box>
                            <Box sx={halfWidthBox}>
                                <FormLabel>Upload PAN Image</FormLabel>
                                <FilePond
                                    files={userKyc?.panImage}
                                    credits={false}
                                    disabled
                                />
                            </Box>
                        </Box>


                    </Paper>
                )

            }
            {
                parseUser.role === "admin" && adminKyc && (
                    <StickyHeadTable
                        columns={[
                            { id: 'accountHolderName', label: 'Account Holder Name', minWidth: 170 },
                            { id: 'bankName', label: 'Bank Name', minWidth: 150 },
                            { id: 'accountNo', label: 'Account Number', minWidth: 150 },
                            { id: 'IFSC', label: 'IFSC Code', minWidth: 150 },
                            { id: 'branchName', label: 'Branch Name', minWidth: 150 },
                        ]}
                        rows={adminKyc} />
                )
            }
        </>
    );
}
