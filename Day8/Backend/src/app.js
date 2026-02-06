const express = require('express');
const noteModel = require("./models/note.model")
const cors = require("cors")
const path = require("path")


const app = express();

app.use(express.json());

app.use(cors())

app.use(express.static(path.join("./public")))



//Post /api/notes
//create new note and save data in mongodb
app.post("/api/notes",async (req,res)=>{
    const {title,description} = req.body;
    const note = await noteModel.create({
        title,description
    })
    res.status(201).json({
        message:"Note created successfully",
        note
    })

})

//Get /api/notes
//fetch all the notes data from mongodb and send them in the response
app.get("/api/notes", async (req,res)=>{
    const notes = await noteModel.find();
    res.status(200).json({
        messaage:"Notes fetched successfully",
        notes
    })
})

//Delete /api/notes/:id
//delete note with the id from req.params
app.delete("/api/notes/:id",async (req,res)=>{
    const id = req.params.id.trim()
    await noteModel.findByIdAndDelete(id)

    res.status(200).json({
        message:"Note deleted successfully"
    })
})

//Patch update
//update the notes description or title
app.patch("/api/notes/:id",async (req,res)=>{
    const id = req.params.id.trim();
    const {title,description} = req.body;
    await  noteModel.findByIdAndUpdate(id,{
        title,
        description
    })

    res.status(200).json({
        message:"Note updated successfully",
        
    })

})

app.use("*name",(req,res)=>{
    res.sendFile(path.join(__dirname,"..","/public/index.html"))
})


module.exports = app;