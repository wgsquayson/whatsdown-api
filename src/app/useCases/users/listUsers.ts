import { Request, Response } from "express";
import { User } from "../../models/User";

export const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    console.log(error);

    res.sendStatus(500);
  }
};
