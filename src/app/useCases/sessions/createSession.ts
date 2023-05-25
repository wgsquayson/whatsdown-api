import { Request, Response } from "express";
import { User } from "../../models/User";

import jwt from "jsonwebtoken";

export const createSession = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  if (password === user.password) {
    jwt.sign({ user }, "privateKey", { expiresIn: "24h" }, (err, token) => {
      if (err) {
        console.log(err);
      }
      res.json({ token });
    });
  } else {
    res.status(400).json({ error: "Invalid e-mail or password" });
  }
};
