const express = require("express");
const app = express();
const database = require("./Config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./Config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");

dotenv.config();
database.connect();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors()); // Enable CORS for all routes
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);

cloudinaryConnect();

// importing routes
const userRoutes = require("./Routes/User");

// defining routes
app.use("/api/v1/auth", userRoutes);

const PORT = process.env.PORT || 8000;

// Route to check service status
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Service is Up and Running",
    });
});

app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`);
});