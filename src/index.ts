const routes = require("./Routes/index");
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.listen(5000, () => {
  console.log("listening to port 5000");
});
