"use client";

import {
  Button,
  FormLabel,
  Paper,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";

// FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { upperCase } from "lodash";
import { postApiFormDataToken, postFormData } from "@/helper/common";
import { toast } from "react-toastify";

// Register plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

export default function DocumentUpload() {
  const [accountNo, setAccountNo] = useState("");
  const [panNo, setPanNo] = useState("");
  const [acHolderName, setAcHolderName] = useState("");
  const [bankName, setBankName] = useState("");
  const [IFSC, setIFSC] = useState("");
  const [aadharNo, setAadharNo] = useState("");
  const [passbook_img, setPassbook_img] = useState([]);
  const [aadhar_img, setAadhar_img] = useState([]);
  const [pan_img, setPan_img] = useState([]);
  const [branchName, setBranchName] = useState();
  const [loader, setLoader] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const formData = new FormData();
    formData.append("accountHolderName", acHolderName);
    formData.append("bankName", bankName);
    formData.append("IFSC", IFSC);
    formData.append("accountNo", accountNo);
    formData.append("panNo", panNo);
    formData.append("aadharNo", aadharNo);
    formData.append("branchName", branchName);

    //
    formData.append("panImage", pan_img[0]?.file);
    formData.append("aadharImage", aadhar_img[0]?.file);
    formData.append("passbookImage", passbook_img[0]?.file);

    //api response
    const res = await postApiFormDataToken("api/user/kyc", formData);
    if (res.success === true) {
      toast.success("Document Uploaded Successfully");
      setAadharNo("");
      setAadhar_img([]);
      setAcHolderName("");
      setAccountNo("");
      setPassbook_img([]);
      setBankName("");
      setPanNo("");
      setPan_img([]);
      setIFSC("");
      setLoader(false);
      setBranchName("");
    } else {
      setLoader(false);
      toast.error(res.message);
    }
  };

  //
  const handleReset = (e) => {
    setAadharNo("");
    setAadhar_img([]);
    setAcHolderName("");
    setAccountNo("");
    setPassbook_img([]);
    setBankName("");
    setPanNo("");
    setPan_img([]);
    setIFSC("");
    setBranchName("");
  };

  return (
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
      <Typography
        variant="h5"
        align="center"
        gutterBottom
        style={{ fontWeight: "600", marginBottom: "36px" }}
      >
        📑 Document Upload
      </Typography>

      {/* bank details */}
      <Box sx={formRowStyle}>
        <Box sx={halfWidthBox}>
          <FormLabel>Account Holder Name</FormLabel>
          <TextField
            fullWidth
            size="small"
            margin="dense"
            placeholder="As Per Documents"
            value={acHolderName}
            onChange={(e) => setAcHolderName(e.target.value)}
          />
        </Box>
        <Box sx={halfWidthBox}>
          <FormLabel>Enter Bank Name</FormLabel>
          <TextField
            fullWidth
            size="small"
            margin="dense"
            placeholder="Enter Bank Name"
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
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
            placeholder="IFSC Number"
            value={IFSC}
            onChange={(e) => setIFSC(e.target.value)}
          />
        </Box>
        <Box sx={halfWidthBox}>
          <FormLabel>Branch Name</FormLabel>
          <TextField
            fullWidth
            size="small"
            margin="dense"
            placeholder="Enter Branch Name"
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
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
            placeholder="Enter Account Number"
            value={accountNo}
            onChange={(e) => setAccountNo(e.target.value)}
          />
        </Box>
        <Box sx={halfWidthBox}>
          <FormLabel>Upload Passbook Image</FormLabel>
          <FilePond
            files={passbook_img}
            onupdatefiles={setPassbook_img}
            allowMultiple={true}
            maxFiles={2}
            credits={false}
            labelIdle='Drag & Drop or <span class="filepond--label-action">Browse</span>'
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
            placeholder="Enter Aadhar Number"
            value={aadharNo}
            onChange={(e) => setAadharNo(e.target.value)}
            inputProps={{
              minLength: 12,
              maxLength: 12,
            }}
          />
        </Box>
        <Box sx={halfWidthBox}>
          <FormLabel>Upload Aadhar Image</FormLabel>
          <FilePond
            files={aadhar_img}
            onupdatefiles={setAadhar_img}
            allowMultiple={true}
            maxFiles={2}
            credits={false}
            labelIdle='Drag & Drop or <span class="filepond--label-action">Browse</span>'
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
            placeholder="Enter PAN Number"
            value={panNo}
            onChange={(e) => setPanNo(e.target.value.toUpperCase())}
            inputProps={{
              minLength: "10",
              maxLength: "10",
            }}
          />
        </Box>
        <Box sx={halfWidthBox}>
          <FormLabel>Upload PAN Image</FormLabel>
          <FilePond
            files={pan_img}
            onupdatefiles={setPan_img}
            allowMultiple={true}
            maxFiles={2}
            credits={false}
            // stylePanelAspectRatio="1.2"
            labelIdle='Drag & Drop or <span class="filepond--label-action">Browse</span>'
          />
        </Box>
      </Box>

      {/* Buttons */}
      <Box sx={{ textAlign: "center", marginTop: "30px" }}>
        <Button
          variant="outlined"
          color="error"
          sx={{ paddingX: 4, paddingY: 1, m: 2 }}
          onClick={handleReset}
        >
          Reset
        </Button>
        <Button
          disabled={loader}
          variant="contained"
          color="primary"
          sx={{ m: 2, paddingX: 4, paddingY: 1 }}
          onClick={handleSubmit}
        >
          {loader ? "Submitting.." : "submit"}
        </Button>
      </Box>
    </Paper>
  );
}
