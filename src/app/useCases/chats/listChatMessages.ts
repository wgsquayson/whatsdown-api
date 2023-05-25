import { Request, Response } from "express";
import { Chat } from "../../models/Chat";
import { RequestWithUser } from "../../../types";

export const listChatMessages = async (req: RequestWithUser, res: Response) => {
  try {
    const { chatId } = req.params;
    const currentUser = req.user;

    const chat = await Chat.findById(chatId).populate(["messages", "users"]);

    if (!chat) {
      return res.status(404).json({ error: "Chat does not exist" });
    }

    const filteredUsers = chat.users.map((user) => {
      return {
        id: user._id,
        // @ts-ignore
        name: user.name,
        // @ts-ignore
        email: user.email,
        // @ts-ignore
        isCurrent: user.email === currentUser?.email,
      };
    });

    const chatWithFilteredUsers = {
      id: chat._id,
      participants: filteredUsers,
      messages: chat.messages,
    };

    res.status(200).json({ chat: chatWithFilteredUsers });
  } catch (error) {
    console.log(error);

    res.sendStatus(500);
  }
};
