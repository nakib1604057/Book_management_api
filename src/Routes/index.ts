import { Router } from "express";
const { PrismaClient } = require("@prisma/client");
const { userSignUP, userLogin } = require("./auth.route");
const { addBook, allBooks, addCategory } = require("./books.route");
const routes = Router();
const prisma = new PrismaClient();
routes.get("/", async (req: any, res: any) => {
  res.status(200).json({
    message: "Home",
  });
});
routes.post("/signup", userSignUP);

routes.post("/login", userLogin);
routes.get("/books", allBooks);
routes.post("/createbook", addBook);
routes.post("/addCategory", addCategory);
routes.get("/user/collection", async (req: any, res: any) => {
  try {
    // find colloection for username nakib2
    const username = "nakib2";
    const collection = await prisma.UserCollection.findMany({
      where: {
        username: username,
      },
      include: { book: true },
    });
    res.json({ collection });
  } catch (error) {
    console.log(error);
  }
});
routes.post("/user/collection", async (req: any, res: any) => {
  try {
    const { username, bookId } = req.body;
    // check is userexist

    // check is user logedIn
    const collection = await prisma.UserCollection.create({
      data: {
        username: username,
        bookId: bookId,
      },
    });

    res.json({
      collection,
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = routes;
