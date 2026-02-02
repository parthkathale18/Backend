const express =  require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.get("/", (req,res) => {
    res.render("index");
})


app.get("/profile/:username", (req,res) => {
    res.send("hi " + req.params.username);
})

app.get("/author/:username/:age", (req,res) => {
    res.send("hi " + req.params.username + " you are " + req.params.age + " years old");
})



app.listen(3000, () => {
    console.log("Server is running on port 3000");
})  


