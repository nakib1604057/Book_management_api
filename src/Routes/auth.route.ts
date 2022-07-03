import { Router } from "express";
const { PrismaClient } = require("@prisma/client");
const { signAccessToken, signRefreshToken } = require("../helper/jwt_helper");
const prisma = new PrismaClient();

const userSignUP = async (req: any, res: any, next: any) => {
  try {
    const { fullname, username, email, password } = req.body;
    const userExist = await isUserExist(email, username);
    console.log(userExist);
    if (userExist) {
      res.json({
        status: "Bed request",
        message: "User exist",
      });
      next();
    } else {
      const user = await prisma.Users.create({
        data: {
          fullName: fullname,
          email: email,
          userName: username,
          password: password,
        },
      });
      if (user) {
        res.status(201).json({
          status: "Successfull",
          message: `Thanks for creating account ${username}`,
        });
      }
    }
  } catch (error) {
    console.log(error);
  }
};
const userLogin = async (req: any, res: any) => {
  try {
    const { username, password } = req.body;

    const user = await prisma.Users.findMany({
      where: {
        AND: [{ userName: String(username) }, { password: String(password) }],
      },
    });

    if (user.length > 0) {
      const accessToken = await signAccessToken(username, user[0].email);
      const refreshToken = await signRefreshToken(username, user[0].email);
      res.json({
        status: "Successfull",
        message: `Welcome back ${username}`,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } else {
      res.json({
        status: "Failed",
        message: "Username or Password is wrong",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
const isUserExist = async (email: string, username: string) => {
  const user = await prisma.Users.findMany({
    where: {
      OR: [{ email: String(email) }, { userName: String(username) }],
    },
  });
  if (user.length > 0) {
    return true;
  } else {
    return false;
  }
};
module.exports = {
  userSignUP,
  userLogin,
};
