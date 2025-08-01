const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { connectDb } = require("./lib/db");
const cors = require("cors");
dotenv.config();
const errorHandler = require("./middlewares/errorHandler");
const passport = require("passport");
require("./utils/passport");
const session = require("express-session");

//routes
const auth = require("./routes/authRoutes");
const user = require("./routes/userRoutes");
const admin = require("./routes/adminRoutes");
const fund = require("./routes/fundRoutes");
const payment = require("./routes/paymentRoutes");

//port and app initilize
const app = express();
const PORT = process.env.PORT;

//middlewares
app.use(
  cors({
    origin: process.env.URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

//
connectDb();

//routes
app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/admin", admin);
app.use("/api/fund", fund);
app.use("/api/payment", payment);

app.use(passport.initialize());

//error handler
app.use(errorHandler);

//testing route
app.get("/", (req, res) => {
  res.send("Everything is ok");
});

//listen port
app.listen(PORT, () => {
  console.log(`server is running on PORT:${PORT}`);
});
