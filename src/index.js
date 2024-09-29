const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const mongoose = require("mongoose");

// Response Sent in JSON format
app.use(express.json());

// Middleware || for testing and learning how middleware works
app.use((req, res, next) => {
    console.log("HTTP Method - " + req.method + ", URL - " + req.url);
    next();
})

app.use(cors());

app.use("/users", userRouter);
app.use("/note", noteRouter);

app.get("/", (req, res) => {
    res.send("Notes Api from SiamSaleh");
});

const PORT = process.env.PORT || 8000;

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => {
            console.log("Server started on port no - " + PORT);
        })
    })
    .catch((error) => {
        console.log(error)
    })