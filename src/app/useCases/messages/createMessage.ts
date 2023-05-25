import { Response } from "express";
import { Message } from "../../models/Message";
import { Chat } from "../../models/Chat";
import { RequestWithUser } from "../../../types";
import { io } from "../../../index";

export const createMessage = async (req: RequestWithUser, res: Response) => {
  try {
    const user = req.user;
    const { chat, text } = req.body;

    if (!(chat && text && user)) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const message = await Message.create({ chat, text, user });

    const chatExists = await Chat.findById(chat);

    const updatedMessages = [...chatExists?.messages!, message.id];

    await Chat.findByIdAndUpdate(chat, { messages: updatedMessages });

    io.emit(`whatsdown-chat-${chat}-new-message`, message);

    const populatedMessage = await message.populate("user");

    res.status(201).json(populatedMessage);
  } catch (error) {
    console.log(error);

    res.sendStatus(500);
  }
};
