const {
  UploadFile,
  DocumentScanner,
  Timelapse,
} = require("@mui/icons-material");
const { uniqueId } = require("lodash");

const MenuItem = [
  {
    id: uniqueId(),
    title: "Documents",
    icon: IconDocument,
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
