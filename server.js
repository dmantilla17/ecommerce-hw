const express = require("express");
const routes = require("./routes");
const config = require(".connection");
// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);
app.use(config);
// sync sequelize models to the database, then turn on the server

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
