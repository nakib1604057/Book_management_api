import { Router } from "express";
const { PrismaClient } = require("@prisma/client");
const { userSignUP, userLogin } = require("./auth.route");
const { addBook, allBooks, addCategory } = require("./books.route");
const { verifyAccessToken } = require("../helper/jwt_helper");
const {
  userAllCollection,
  userNewCollection,
  shareCollection,
  getAllSharedCollectionInfo,
} = require("./user.route");
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
routes.get("/user/collection", verifyAccessToken, userAllCollection);
routes.post("/user/collection", verifyAccessToken, userNewCollection);
routes.post("/share/collection", verifyAccessToken, shareCollection);
routes.get("/share/collection", verifyAccessToken, getAllSharedCollectionInfo);
module.exports = routes;
