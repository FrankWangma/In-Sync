import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jwt from './src/authentication/jwt.js';
import cors from 'cors';

import routes from './src/routes/index.js';
import errorHandler from './src/authentication/errorHandler.js';

const app = express();

/**
  * Connect to the database
  */
const mongoDB_uri = process.env.MONGODB_URI || "mongodb://localhost"
mongoose.connect(mongoDB_uri);
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
app.use(errorHandler)

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
