import { UserAuthentication } from "../../interfaces/userService/userAuthentication";
import serviceRegistry from "../serviceRegistry";

const serviceUri = serviceRegistry.userService;

// TODO move to general scope
export type ControllerResponse<Obj> = {
  success: boolean;
  errors: string[];
  data?: Obj;
};

export async function loginUser(username: string, password: string): Promise<ControllerResponse<UserAuthentication>> {// should return token 
  try {
    const res = await fetch(`${serviceUri}/api/auth/login`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, password }),
  })
  
    const data = await res.json();
    if (!res.ok) {
      console.log(data)
      throw Error(data.error)
    }
    const result: ControllerResponse<UserAuthentication> = {
      success: true,
      errors: [],
      data: data.data,
    };

    return result;
  } catch (error: any) {
    const result: ControllerResponse<UserAuthentication> = {
      success: false,
      errors: [error.message],
    };

    return result;
  }
}

export async function registerUser(username: string, email: string, password: string): Promise<ControllerResponse<null>> {// should return token 
  try {
    const res = await fetch(`${serviceUri}/api/auth/register`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, email, password }),
  })
  
    const data = await res.json();
    if (!res.ok) {
      console.log(data)
      throw Error(data.error)
    }
    const result: ControllerResponse<null> = {
      success: true,
      errors: [],
    };

    return result;
  } catch (error: any) {
    const result: ControllerResponse<null> = {
      success: false,
      errors: [error.message],
    };

    return result;
  }
}