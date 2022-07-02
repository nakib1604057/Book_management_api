import { Router } from "express";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const allBooks = async (req: any, res: any) => {
  try {
    const books = await prisma.Book.findMany({
      include: { category: true },
    });
    res.status(200).json(books);
  } catch (error) {
    console.log(error);
  }
};
const addBook = async (req: any, res: any, next: any) => {
  try {
    const { name, author, categoryId } = req.body;
    const book = await prisma.Book.create({
      data: {
        name: name,
        author: author,
        categoryId: categoryId,
      },
    });
    if (book) {
      res.status(201).json({
        status: "Succesfull",
        book,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const addCategory = async (req: any, res: any) => {
  try {
    const { name } = req.body;
    const cate = await prisma.Category.create({
      data: {
        name: name,
      },
    });
    res.json({
      cate,
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  allBooks,
  addBook,
  addCategory,
};
