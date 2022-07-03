const JWT = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require("../config");
// create token
async function signAccessToken(userId: any, userEmail: any) {
  return new Promise((resolve, reject) => {
    const authData = {
      aud: userId,
      audEmail: userEmail,
    };
    // console.log("type", typeof userId);
    const secret = ACCESS_TOKEN_SECRET;
    const options = {
      expiresIn: "24h",
      issuer: "nakib",
    };
    JWT.sign(authData, secret, options, (err: any, token: any) => {
      if (err) {
        console.log(err);
        return reject(err);
      }
      resolve(token);
    });
  });
}
// verify token
async function verifyAccessToken(req: any, res: any, next: any) {
  if (!req.headers["authorization"]) {
    next(new Error("Unauthorize User"));
  }
  const authHeader = req.headers["authorization"];
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];
  JWT.verify(token, ACCESS_TOKEN_SECRET, (err: any, authData: any) => {
    if (err) {
      const message =
        err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
      return next(message);
    }

    req.authData = authData;
    next();
  });
}

// create refresh token
async function signRefreshToken(userId: any, userEmail: any) {
  return new Promise((resolve, reject) => {
    const authData = {
      aud: userId,
      audEmail: userEmail,
    };

    const secret = REFRESH_TOKEN_SECRET;
    const options = {
      expiresIn: "30d",
      issuer: "nakib",
    };
    JWT.sign(authData, secret, options, (err: any, token: any) => {
      if (err) {
        console.log(err);
        return reject(new Error("Internal server Error"));
      }
      return resolve(token);
    });
  });
}

async function verifyRefreshToken(refreshtoken: any) {
  return new Promise((resolve, reject) => {
    const secret = REFRESH_TOKEN_SECRET;

    JWT.verify(refreshtoken, secret, (err: any, authData: any) => {
      if (err) {
        reject(err.message);
        return;
      }
      const userId = authData.aud;
      const userEmail = authData.audEmail;
      console.log("verify", authData);
      return resolve({ userId, userEmail });
    });
  });
}

async function matchTokenInfo(userId: any, tokenInfo: any) {
  const { aud, audEmail } = tokenInfo;
  console.log("matchTokn", userId);
  if (userId == aud) {
    return true;
  }
  return false;
}

module.exports = {
  signAccessToken,
  verifyAccessToken,
  signRefreshToken,
  verifyRefreshToken,
  matchTokenInfo,
};
