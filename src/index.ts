const routes = require("./Routes/index");
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(async (req: any, res: any, next: any) => {
  const error = new Error("Page not found");
  next(new Error("page not foound"));
});

app.use((err: any, req: any, res: any, next: any) => {
  res.status(err.status || 500).send({
    error: {
      status: err.status,
      message: err.message,
    },
  });
});
app.listen(5000, () => {
  console.log("listening to port 5000");
});
