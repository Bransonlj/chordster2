import { DataRecord } from "../interfaces/dataRecord/index.js";
import { Query } from "../interfaces/query/index.js";

type ObjWithId = {
  id: unknown;
};

interface DBService<CreateDTO, UpdateDTO, Obj extends ObjWithId> {
  create(body: CreateDTO): Promise<Obj>;
  findById(id: Obj["id"]): Promise<Obj | null>;
  findAll(): Promise<DataRecord<Obj[]>>;
  update(id: Obj["id"], body: Partial<UpdateDTO>): Promise<Obj>;
  delete(id: Obj["id"]): Promise<Obj>;
}

export default DBService;