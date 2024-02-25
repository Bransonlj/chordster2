import { SongMetaData } from "../songMetaData";

export type Song = SongMetaData & {
  body: string;
}