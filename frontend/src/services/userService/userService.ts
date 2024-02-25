import { ServiceResponse } from "../../interfaces/serviceResponse";
import { UserAuthentication } from "../../interfaces/userService/userAuthentication";
import serviceRegistry from "../serviceRegistry";

const serviceUri = serviceRegistry.userService;

export async function loginUser(username: string, password: string): Promise<ServiceResponse<UserAuthentication>> {// should return token 
  try {
    const res = await fetch(`${serviceUri}/auth/login`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, password }),
  })
  
    const data = await res.json();
    if (!res.ok) {
      console.log(data)
      throw Error(data.error)
    }
    const result: ServiceResponse<UserAuthentication> = {
      success: true,
      errors: [],
      data: data.data,
    };

    return result;
  } catch (error: any) {
    const result: ServiceResponse<UserAuthentication> = {
      success: false,
      errors: [error.message],
    };

    return result;
  }
}

export async function registerUser(username: string, email: string, password: string): Promise<ServiceResponse<null>> {// should return token 
  try {
    const res = await fetch(`${serviceUri}/auth/register`, {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, email, password }),
  })
  
    const data = await res.json();
    if (!res.ok) {
      console.log(data)
      throw Error(data.error)
    }
    const result: ServiceResponse<null> = {
      success: true,
      errors: [],
    };

    return result;
  } catch (error: any) {
    const result: ServiceResponse<null> = {
      success: false,
      errors: [error.message],
    };

    return result;
  }
}