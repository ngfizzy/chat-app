import { Schema, Document, model } from "mongoose";
import {IUser} from '../../types/models.d';

const schema = new Schema({
  name: String,
  email: {type: String, unique: true},
  username: {type: String, unique: true},
  password: String,
}, { timestamps: true});

schema.index({name: 'text'});

export interface UserDoc extends Document, Omit<IUser, 'id' | 'token' | '_id'> {}
export const User = model<
    UserDoc
  >('User', schema);