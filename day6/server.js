//Form Handling with Express.js
const express =  require('express');

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use(express.json());



