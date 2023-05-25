import { Response } from "express";
import { User } from "../../models/User";
import { Chat } from "../../models/Chat";
import { RequestWithUser, User as UserType } from "../../../types";

export const listUserChats = async (req: RequestWithUser, res: Response) => {
  try {
    const id = req.user?._id;

    console.log(req.user);

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const chats = await Chat.find({ users: id }).populate<UserType>("users");

    const chatsWithoutMessages = chats.map((chat) => {
      return {
        id: chat._id,
        participants: chat.users
          .map((user) => {
            if (String(user._id) !== id) {
              return {
                // @ts-ignore
                name: user.name,
                // @ts-ignore
                email: user.email,
              };
            }
          })
          .filter(Boolean),
      };
    });

    res.status(200).json({ chats: chatsWithoutMessages });
  } catch (error) {
    console.log(error);

    res.sendStatus(500);
  }
};
