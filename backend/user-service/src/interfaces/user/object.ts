import { IUser } from "../schema/index.js"

export type User = IUser & {
  id: string;
}