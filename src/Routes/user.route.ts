import { Router } from "express";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const userAllCollection = async (req: any, res: any) => {
  try {
    // find colloection for username nakib2
    const username = req.authData.aud;
    const collection = await prisma.UserCollection.findMany({
      where: {
        username: username,
      },
      include: { book: true },
    });
    const sharedBooks = await prisma.SharedCollection.findMany({
      where: {
        shareHolderId: username,
      },
    });
    res.json({ collection, sharedBooks });
  } catch (error) {
    console.log(error);
  }
};
const userNewCollection = async (req: any, res: any) => {
  try {
    const { bookId } = req.body;
    const username = req.authData.aud;
    const hasthisbook = await prisma.UserCollection.findMany({
      where: {
        username: username,
        bookId: bookId,
      },
    });

    if (hasthisbook.length == 0) {
      const collection = await prisma.UserCollection.create({
        data: {
          username: username,
          bookId: bookId,
        },
      });

      res.json({
        collection,
      });
    } else {
      res.json({
        message: "Already has this book!",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const shareCollection = async (req: any, res: any) => {
  try {
    const { bookId, holderUsername } = req.body;
    console.log(bookId);
    // find user has this book in his collection
    // now user is nakib2
    const username = req.authData.aud;
    const hasBook = await prisma.UserCollection.findMany({
      where: {
        username: username,
        bookId: bookId,
      },
    });
    console.log(hasBook);
    if (hasBook.length > 0) {
      // user has this book
      const addShareholder = await prisma.SharedCollection.create({
        data: {
          shareHolderId: holderUsername,
          userCollectionId: hasBook[0].id,
        },
      });
      res.status(201).json({
        status: "Successfull",
        message: `${holderUsername} has access to this book`,
        addShareholder,
      });
    } else {
      // user don't has this book
      res.status(401).json({
        status: "Failed",
        message: "User don't have this book in his collection",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const getAllSharedCollectionInfo = async (req: any, res: any) => {
  try {
    const username = req.authData.aud;
    const collection = await prisma.UserCollection.findMany({
      where: {
        username: username,
      },
      include: { sharedCollections: true },
    });
    res.json({
      collection,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  userAllCollection,
  userNewCollection,
  shareCollection,
  getAllSharedCollectionInfo,
};
