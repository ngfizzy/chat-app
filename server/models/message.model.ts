import { model, Schema, Document } from 'mongoose';
import { IMessage } from '../../types/models';

const schema = new Schema({
  author: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  },
  text: String
}, { timestamps: true });

export interface MessageDoc extends Document, Omit<IMessage, '_id'> {}
export const Conversation = model<
    MessageDoc
  >('User', schema);
