import { IUser } from "../schema/index.js";

export type UserUpdateDTO = IUser & {
  currentPassword: string;
}