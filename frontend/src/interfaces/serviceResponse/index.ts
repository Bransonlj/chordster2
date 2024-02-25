export type ServiceResponse<Obj> = {
  success: boolean;
  errors: string[];
  data?: Obj;
};