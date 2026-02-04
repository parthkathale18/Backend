const express =  require('express');
const noteModel = require("./models/notes.model")
const app = express();

//Middleware mandatory for reading the req.body data as it comes in form of string and without middleware it willbe in non readable form 
app.use(express.json());


//Post /notes
//req.body => {title,description}

app.post("/notes",async (req,res)=>{
    const {title,description} = req.body;
    const note = await noteModel.create({
        title,description
    })

    res.status(201).json({
        message:"Note created successfully",
        note
    })
})


module.exports = app;