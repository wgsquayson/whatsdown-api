import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { RequestWithUser } from "../../types";

export const checkAuth = (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers["authorization"];

  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];

    if (!token) {
      return res.status(403).json({ error: "Missing token" });
    }

    try {
      // @ts-ignore
      const { user } = jwt.verify(token, "privateKey");

      req.user = user;
    } catch (error) {
      return res.status(401).json({ error: "Invalid token" });
    }

    return next();
  } else {
    res.sendStatus(403);
  }
};
