require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const error = require('./middleware/error');
const routes = require('./routes');

require('./database');

const app = express();

app.use(bodyParser.json({ limit: '25MB' }));

app.use(cors());

app.use(routes);

//error middleware
app.use(error);

module.exports = app;
