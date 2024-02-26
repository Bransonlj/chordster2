import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/schema/index.js';


const userSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  }, {
    timestamps: {createdAt: "createdAt", updatedAt: "updatedAt"},
  });

const User = model<IUser>('User', userSchema);

export default User;
