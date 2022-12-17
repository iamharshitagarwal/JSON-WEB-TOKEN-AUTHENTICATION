const express = require("express");
const app = express();
// const examples = require("./example.json");
const notesRouter = require("./routes/notesRoutes");
const userRouter = require("./routes/userRoutes");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const mongoose = require("mongoose");

app.use(express.json());  //to get the data in json format.

app.use(cors());

app.use((req, res, next)=>{  //middleware
    console.log("HTTP Method - " + req.method + ",  URL - " + req.url);  
    next();
});


app.use("/users", userRouter);
app.use("/note", notesRouter);

app.get("/", (req,res)=> {
    res.send("hello");
});



// app.get("/jsondata", (req,res)=>{
// res.status(200).json(examples);
// })

// app.use("/random", (req,res)=>{
//     let index = Math.floor(Math.random() * examples.length)
//     let example = examples[index];
//     res.status(200).json(example);
// })


const PORT  = process.env.MONGO_URL || 5000;

mongoose.connect(process.env.MONGO_URL)
.then(()=>{

    app.listen(5000, ()=> {
        console.log("Listening to port no. 5000"); 
    });
})
.catch((error)=>{
    console.log(error);
})

