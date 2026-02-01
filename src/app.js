const express =  require('express');
const app = express();
app.use(express.json());

const notes = [];


// POST METHOD notes
app.post("/notes", (req, res) => {
    console.log(req.body);
    notes.push(req.body);
    res.send("note received");
    console.log(notes);
});


// GET METHOD notes
app.get("/notes", (req, res)=>{
    res.send(notes);
})


// DELETE METHOD notes
//params : to delete specific item
// delete /notes/2
app.delete("/notes/:index",(req,res)=>{
    delete notes[req.params.index];
    res.send("note deleted");
})


//PATCH METHOD notes
//to update a description of specific index note
app.patch("/notes/:index",(req,res)=>{
    notes[req.params.index].description = req.body.description;
    res.send("note updated");
})
module.exports = app;