import { Schema, model } from "mongoose";

export const Message = model(
  "Message",
  new Schema({
    user: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    chat: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "Chat",
    },
    text: {
      required: false,
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  })
);
