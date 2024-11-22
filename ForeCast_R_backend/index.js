const cors = require('cors');
const db = require('./database/db');
const express = require('express');
const app = express();
const routes = require('./routes/routes');

app.use(express.json());
app.listen(3000, () =>{
    console.log('Server is running on port 3000.');
});

app.use(cors());
app.use('/', routes);

