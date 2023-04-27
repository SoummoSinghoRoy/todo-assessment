require('dotenv').config()
const express = require('express');
const app = express();
const config = require('config');
const mongoose = require('mongoose');

const setMiddlewares = require('./middlewares/middleware');
const setRoutes = require('./routes/route');

setMiddlewares(app)
setRoutes(app)

const PORT = process.env.PORT || 4848

mongoose.set("strictQuery", false);
mongoose.connect(config.get("db-uri"), {
  useNewUrlParser: true
}).then(() => {
  console.log("Database connected.....");
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
  })
}).catch((err) => {
  console.log(err);
})