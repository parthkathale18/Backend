const express  =  require('express');
const app  =  express();
app.use(express.json());
const notes = [];

app.post('/notes', (req, res) => {
    console.log(req.body);
    notes.push(req.body);
    res.status(201).json({
    message: 'Note added successfully'
    })
})

app.get('/notes', (req, res) => {
    res.status(200).json({
        notes: notes
    })
});

app.delete('/notes/:index', (req, res) => {
    delete notes[req.params.index];
    res.status(200).json({
        message: 'Note deleted successfully'
    })
});

app.patch('/notes/:index', (req, res) => {
    notes[req.params.index].description = req.body.description;
    res.status(200).json({
        message: 'Note updated successfully'
    })
})
module.exports  =  app;