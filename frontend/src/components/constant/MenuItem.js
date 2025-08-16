const {
  UploadFile,
  DocumentScanner,
  Timelapse,
  DocumentScannerRounded,
  CreateSharp,
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
        href: "/dashboard/document/upload-document/",
        roles: ["user"],
      },
      {
        id: uniqueId(),
        title: "View Documents",
        icon: DocumentScanner,
        href: "/",
        roles: ["admin", "user"],
      },
      {
        id: uniqueId(),
        title: "Kyc Status",
        icon: Timelapse,
        href: "/",
        roles: ["admin", "user"],
      },
    ],
  },
  {
    id: uniqueId(),
    title: "Create Campaign",
    icon: DocumentScannerRounded,
    href: "/",
    roles: ["admin", "user"],
    children: [
      {
        id: uniqueId(),
        title: "view Campaign",
        icon: UploadFile,
        href: "/",
        roles: ["user"],
      },
      {
        id: uniqueId(),
        title: "campaign Statuss",
        icon: Timelapse,
        href: "/",
        roles: ["admin", "user"],
      },
    ],
  },
  {
    id: uniqueId(),
    title: "User's List",
    icon: DocumentScannerRounded,
    href: "/",
    roles: ["admin"],
    // children: [
    //   {
    //     id: uniqueId(),
    //     title: "",
    //     icon: UploadFile,
    //     href: "/",
    //     roles: ["user"],
    //   },
    //   {
    //     id: uniqueId(),
    //     title: "View Documents",
    //     icon: DocumentScanner,
    //     href: "/",
    //     roles: ["admin", "user"],
    //   },
    //   {
    //     id: uniqueId(),
    //     title: "Kyc Status",
    //     icon: Timelapse,
    //     href: "/",
    //     roles: ["admin", "user"],
    //   },
    // ],
  },
];

export default MenuItem;
