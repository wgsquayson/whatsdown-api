import { Router } from "express";

import { listUsers } from "./app/useCases/users/listUsers";
import { createUser } from "./app/useCases/users/createUser";
import { createChat } from "./app/useCases/chats/createChat";
import { listUserChats } from "./app/useCases/chats/listUserChats";
import { createMessage } from "./app/useCases/messages/createMessage";
import { listChatMessages } from "./app/useCases/chats/listChatMessages";
import { createSession } from "./app/useCases/sessions/createSession";
import { checkAuth } from "./app/middlewares/auth";

export const router = Router();

router.get("/users", listUsers);
router.post("/users", createUser);

router.get("/chats", checkAuth, listUserChats);
router.post("/chats", checkAuth, createChat);
router.get("/chats/:chatId/messages", checkAuth, listChatMessages);

router.post("/messages", checkAuth, createMessage);

router.post("/sessions", createSession);
