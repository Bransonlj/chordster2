import { ServiceResponse } from "../interfaces/serviceResponse";
import { DataRecord } from "../interfaces/songService/dataRecord";
import { UserAuthentication } from "../interfaces/userService/userAuthentication";

interface CRUDService<CreateDTO, UpdateDTO, Obj> {
  findAll(): ServiceResponse<DataRecord<Obj>>;
  findById(id: string | number): ServiceResponse<Obj>;
  create(input: CreateDTO, user: UserAuthentication): ServiceResponse<Obj>;
  update(input: Partial<UpdateDTO>, id: string | number, user: UserAuthentication): ServiceResponse<Obj>;
  delete(id: string | number, user: UserAuthentication): ServiceResponse<Obj>;
}

export default CRUDService;
