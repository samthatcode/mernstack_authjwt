const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const dotenv = require('dotenv');
dotenv.config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const { MONGO_URL }  = process.env;



// Connect to MongoDB using the MONGO_URL
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("MongoDB is  connected successfully")).catch((err) => console.error(err));

// Set up the server to listen on the specified PORT:
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

// Enable CORS for the specified origin, methods, and credentials:
app.use(
    cors({
        origin: ["http://localhost:5000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

// Parse request bodies as JSON: app.use(express.json());
app.use(express.json());
app.use(cookieParser());
app.use("/", authRoute);
