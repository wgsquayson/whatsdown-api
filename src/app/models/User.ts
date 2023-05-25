import { Schema, model } from "mongoose";

export const User = model(
  "User",
  new Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    chats: {
      required: false,
      default: [],
      type: [
        {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Chat",
        },
      ],
    },
  })
);
