import { Schema, model } from "mongoose";

export const Chat = model(
  "Chat",
  new Schema({
    users: {
      required: true,
      type: [
        {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
      ],
    },
    messages: {
      required: false,
      type: [
        {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Message",
        },
      ],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  })
);
