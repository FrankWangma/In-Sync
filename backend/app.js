import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jwt from './src/_helpers/jwt'

import routes from './src/routes/index.js';

const app = express();
const cors = require('cors');

/**
  * Connect to the database
  */

mongoose.connect(process.env.MONGODB_URI);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

/**
  * Middleware
  */

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(jwt());

app.use(cors());
app.use(jwt());

// catch 400
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(400).send(`Error: ${res.originUrl} not found`);
  next();
});

// catch 500
app.use((err, req, res, next) => {
  console.log(err.stack)
  res.status(500).send(`Error: ${err}`);
  next();
});

/**
  * Register the routes
  */

routes(app);

export default app;
