const {
  UploadFile,
  DocumentScanner,
  Timelapse,
  DocumentScannerRounded,
} = require("@mui/icons-material");
const { uniqueId } = require("lodash");

const MenuItem = [
  {
    id: uniqueId(),
    title: "Documents",
    icon: DocumentScannerRounded,
    href: "/",
    roles: ["admin", "user"],
    children: [
      {
        id: uniqueId(),
        title: "Uplaod Documents",
        icon: UploadFile,
        href: "/",
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
        title: "Document Status",
        icon: Timelapse,
        href: "/",
        roles: ["admin", "user"],
      },
    ],
  },
];

export default MenuItem;
