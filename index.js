const express = require('express');
const router = require('./src/route');

const app = express();

app.use(express.json());

const port = 5000;

app.get('/',(req,res) => {
    res.send('Hello Express');
});

app.use('/api/v1/',router);

app.listen(port, () => {
    console.log(`Aplikasi running in http://localhost:${port}`)
});