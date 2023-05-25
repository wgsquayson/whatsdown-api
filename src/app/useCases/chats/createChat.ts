import { Request, Response } from "express";
import { User } from "../../models/User";
import { Chat } from "../../models/Chat";
import { RequestWithUser } from "../../../types";

export const createChat = async (req: RequestWithUser, res: Response) => {
  try {
    const currentUser = req.user;
    const { emails } = req.body;

    const chatUsers = [...emails, currentUser?.email];

    if (chatUsers.length < 2) {
      return res.status(400).json({ error: "More than 1 user is required" });
    }

    const usersExist = await User.find({ email: chatUsers });

    if (usersExist.length < 2) {
      return res.status(400).json({ error: "User not found" });
    }

    const users = usersExist.map((user) => user._id);

    const chat = await Chat.create({
      users,
    });

    usersExist.forEach(async (user) => {
      const userChats = user!.chats;

      user.chats = [...userChats!, chat.id];

      await user.save();
    });

    const populatedChat = await chat.populate("users");

    res.status(201).json(populatedChat);
  } catch (error) {
    console.log(error);

    res.sendStatus(500);
  }
};
