const data = require('./applicationData.js');
const express = require("express");
const app = express();
const database = require("./Config/database");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { cloudinaryConnect } = require("./Config/cloudinary");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
const fs = require("fs");

// dotenv.config();
// database.connect();

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
app.use("/api/v1/application", require("./Routes/Application"));

const PORT = process.env.PORT || 8000;

// Route to check service status
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Service is Up and Running",
    });
});

app.get("/api/v1/application/get-app/specific/:package" ,async (req, res) => {
    try{
        const reqPackage = req.params['package'];
        const filePath = `./Resources/${reqPackage}`;
        
        res.setHeader('Content-Type', 'application/vnd.android.package-archive');
        res.setHeader('Content-Length', fs.statSync(filePath).size);
      
        // Stream the APK file to the client.
        const readStream = fs.createReadStream(filePath);
        readStream.pipe(res);
    }catch(e){
        console.error(e);

        return res.status(500).json({
            success: false,
            message: "Unable to get the apk. Please try again."
        })
    }
})

app.get("/api/v1/application/get-app" ,async (req, res) => {
    try{
        const latestVersion = data[data.length - 1];
        const filePath = `./Resources/${latestVersion.package_name}`;

        res.setHeader('Content-Type', 'application/vnd.android.package-archive');
        res.setHeader('Content-Length', fs.statSync(filePath).size);
      
        // Stream the APK file to the client.
        const readStream = fs.createReadStream(filePath);
        readStream.pipe(res);
    }catch(e){
        console.error(e);

        return res.status(500).json({
            success: false,
            message: "Unable to get the apk. Please try again."
        })
    }
})

app.listen(PORT, () => {
    console.log(`Server started at PORT ${PORT}`);
});