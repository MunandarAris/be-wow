require('dotenv').config();

const express = require('express');
const router = require('./src/routes');

const app = express();

app.use(express.json());

app.use('/uploads',express.static('uploads'));

const port = 5000;

app.get('/',(req,res) => {
    res.send('Hello Express');
});

app.use('/api/v1/',router);

app.listen(port, () => {
    console.log(`Aplikasi running in http://localhost:${port}`)
});