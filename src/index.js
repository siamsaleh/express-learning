const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");

const mongoose = require("mongoose");

// Response Sent in JSON format
app.use(express.json());

// Middleware
app.use((req, res, next) => {
    console.log("HTTP Method - " + req.method + ", URL - " + req.url);
    next();
})

app.use("/users", userRouter);
app.use("/note", noteRouter);

app.get("/", (req, res) => {
    res.send("Hello");
});

const port = 8000;

mongoose.connect("mongodb+srv://siamsaleh:SiamSaleh@cluster0.tiie8uq.mongodb.net/express")
    .then(() => {
        app.listen(port, () => {
            console.log("Server started on port no - " + port);
        })
    })
    .catch((error) => {
        console.log(error)
    })