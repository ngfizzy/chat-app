import { model, Schema, Document } from 'mongoose';
import { IMessage } from '../../types/models';

const schema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  conversation: {
    type: Schema.Types.ObjectId,
    ref: 'Conversation'
  },
  text: String
}, { timestamps: true });

export interface MessageDoc extends Document, Omit<IMessage, '_id'> {}
export const Message = model<
  MessageDoc
>('Message', schema);
