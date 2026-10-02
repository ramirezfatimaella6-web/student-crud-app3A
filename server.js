require("dotenv").config();

const dns = require("node:dns");
dns.setServers(["1.1.1.1", "1.0.0.1"]);

const express = require("express");
const mongoose = require("mongoose");

const studentRoutes = require("./routes/studentRoutes");

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(express.static("public"));
app.use("/api/students", studentRoutes);

async function startServer() {
    try {
        if(!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI is missing from .env");
    }

        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 5000,
        });


    console.log("Connected to MongoDB");


        // Start the server
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        });
    } catch(error)  {
        console.error("MongoDB connection error:", error);
        console.error(error.message);
    }
}
startServer();
