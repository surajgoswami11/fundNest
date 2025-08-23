const {
  UploadFile,
  DocumentScanner,
  Timelapse,
  DocumentScannerRounded,
  CreateSharp,
  CreateNewFolder,
} = require("@mui/icons-material");
const { uniqueId } = require("lodash");

const MenuItem = [
  {
    id: uniqueId(),
    title: "Kyc",
    icon: DocumentScannerRounded,
    href: "/",
    roles: ["admin", "user"],
    children: [
      {
        id: uniqueId(),
        title: "Uplaod Documents",
        icon: UploadFile,
        href: "/dashboard/documents/upload-document/",
        roles: ["user"],
      },
      {
        id: uniqueId(),
        title: "View Documents",
        icon: DocumentScanner,
        href: "/dashboard/documents/view-document/",
        roles: ["admin", "user"],
      },
      {
        id: uniqueId(),
        title: "Kyc Status",
        icon: Timelapse,
        href: "/dashboard/documents/kyc-status/",
        roles: ["admin", "user"],
      },
    ],
  },
  {
    id: uniqueId(),
    title: "Campaign",
    icon: DocumentScannerRounded,
    href: "/",
    roles: ["admin", "user"],
    children: [
      {
        id: uniqueId(),
        title: "Create Campaign",
        icon: CreateNewFolder,
        href: "/dashboard/campaign/create/",
        roles: ["user", "admin"]
      },
      {
        id: uniqueId(),
        title: "view Campaign",
        icon: UploadFile,
        href: "/dashboard/campaign/create/",
        roles: ["user", "admin"],
      },
      // {
      //   id: uniqueId(),
      //   title: "campaign Status",
      //   icon: Timelapse,
      //   href: "/",
      //   roles: ["admin", "user"],
      // },
    ],
  },
  {
    id: uniqueId(),
    title: "User List",
    icon: DocumentScannerRounded,
    href: "/",
    roles: ["admin"],
  },
];

export default MenuItem;
