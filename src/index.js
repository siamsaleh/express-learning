const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");

const mongoose = require("mongoose");


app.use("/users", userRouter)
app.use("/note", noteRouter)

app.get("/", (req, res) =>{
    res.send("Hello");
})

mongoose.connect("mongodb+srv://siamsaleh:SiamSaleh@cluster0.tiie8uq.mongodb.net/")
.then(()=>{
    app.listen(5000, ()=>{
        console.log("Server started on port no. 5000");
    })
})
.catch((error)=>{
    console.log(error)
})