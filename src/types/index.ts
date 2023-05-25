import { Request } from "express";

export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  chats: string[];
  __v: number;
};

export type RequestWithUser = Request & {
  user?: User;
};
