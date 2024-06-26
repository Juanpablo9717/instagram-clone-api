import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  sender: mongoose.Types.ObjectId;
  receiver: mongoose.Types.ObjectId;
  text: string;
  imageUrl?: string;
  audioUrl?: string;
}

const messageSchema: Schema = new Schema({
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true },
  imageUrl: { type: String },
  audioUrl: { type: String },
});

export default mongoose.model<IMessage>("Message", messageSchema);
