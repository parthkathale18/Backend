const app = require("./src/app");

const mongoose  =  require('mongoose');

function connectToDb(){
    mongoose.connect("mongodb+srv://parth:CwBSvJpGiCrYnSKM@cluster0.hf8e412.mongodb.net/day5")
    .then(() =>{
        console.log("Connected to DB");
    })
}

connectToDb();
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});