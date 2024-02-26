import { IUser } from "../schema/index.js"

// type for user without any confidential information
export type PublicUser = Omit<Omit<IUser, 'password'>, 'email'> & {
  id: string;
}