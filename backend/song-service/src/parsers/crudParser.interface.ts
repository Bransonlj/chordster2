import { Query } from "../interfaces/query/index.js";

type ObjWithId = {
  id: unknown;
};

// Converts all keys in object to string
export type StringInterface<T> = {
  [P in keyof T]: T[P] extends Array<infer U>
    ? Array<StringInterface<U>>
    : T[P] extends Date
    ? string
    : T[P] extends object
    ? StringInterface<T[P]> // recurse on object T[P]
    : string;
};

interface CRUDParser<CreateDTO, UpdateDTO, Obj extends ObjWithId> {
  parseCreateInput(input: StringInterface<CreateDTO>): CreateDTO;
  parseFindByIdInput(id: string): Obj["id"];
  parseUpdateInput(
    input: Partial<StringInterface<UpdateDTO>>,
  ): Partial<UpdateDTO>;
}

export default CRUDParser;