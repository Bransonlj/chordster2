import axios from "axios";
import { ServiceResponse } from "../../interfaces/serviceResponse";
import { UserAuthentication } from "../../interfaces/userService/userAuthentication";
import serviceRegistry from "../serviceRegistry";
import { UserLoginDTO } from "../../interfaces/userService/login";
import { handleAxiosError, handleAxiosSuccess } from "../../utils/queryHandlers";
import { UserCreateDTO } from "../../interfaces/userService/user/createDTO";
import { PublicUser } from "../../interfaces/userService/publicUser";

const serviceUri = serviceRegistry.userService;

export async function loginUser(loginParams: UserLoginDTO): Promise<ServiceResponse<UserAuthentication>> {// should return token 
  const res = await axios.post<UserAuthentication>(`${serviceUri}/auth/login`, loginParams)
    .then(handleAxiosSuccess<UserAuthentication>)
    .catch(handleAxiosError<UserAuthentication>);

  return res;
}

export async function registerUser(input: UserCreateDTO): Promise<ServiceResponse<PublicUser>> {
  const res = await axios.post<PublicUser>(`${serviceUri}/auth/register`, input)
    .then(handleAxiosSuccess<PublicUser>)
    .catch(handleAxiosError<PublicUser>);
  return res;
}