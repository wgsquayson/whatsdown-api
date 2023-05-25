import { Request, Response } from "express";
import { User } from "../../models/User";

import jwt from "jsonwebtoken";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!(name && email && password)) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    jwt.sign({ user }, "privateKey", { expiresIn: "24h" }, (err, token) => {
      if (err) {
        console.log(err);
      }
      res.json({ token });
    });
  } catch (error) {
    console.log(error);

    res.sendStatus(500);
  }
};
