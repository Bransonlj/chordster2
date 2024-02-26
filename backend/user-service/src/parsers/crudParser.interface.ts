import { StringInterface } from "../interfaces/stringInterface/index.js";

type ObjWithId = {
  id: unknown;
};

interface CRUDParser<CreateDTO, UpdateDTO, Obj extends ObjWithId> {
  parseCreateInput(input: StringInterface<CreateDTO>): CreateDTO;
  parseFindByIdInput(id: string): Obj["id"];
  parseUpdateInput(
    input: Partial<StringInterface<UpdateDTO>>,
  ): Partial<UpdateDTO>;
}

export default CRUDParser;