import { Schema, Document, model } from "mongoose";
import {IConversation } from '../../types/models';

const schema = new Schema({
  parties: {
    type: [Schema.Types.ObjectId],
    ref: 'User'
  },
  messages: {
    type: [Schema.Types.ObjectId], 
    ref: 'Message'
  }
}, {timestamps: true});

export interface ConversationDoc extends Document, Omit<IConversation, '_id'> {}
export const Conversation = model<
    ConversationDoc
  >('User', schema);

