//require modules
const { noteData } = require('./db/db.json')
const express = require("express");
const fs = require('fs');
const path = require('path');
const apiRoutes = require('./routes/apiRoutes/index.js')
const htmlRoutes = require('./routes/htmlRoutes/index.js');


const PORT = process.env.PORT || 3001;
const app = express();

//middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//use routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//listen for port
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });