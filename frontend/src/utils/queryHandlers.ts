import axios, { AxiosError, AxiosResponse } from "axios";
import { ServiceResponse } from "../interfaces/serviceResponse";
import { ErrorResponse } from "../interfaces/errorResponse";

export function handleAxiosError<T>(error: Error | AxiosError): ServiceResponse<T> {
  let errorMessage: string;
    if (axios.isAxiosError(error))  {
      if (error.response) {
        errorMessage = `${error.response.status} Error: ${(error.response.data as ErrorResponse)?.message}`;
      } else {
        errorMessage = `No Response: ${error.message}`
      }
    } else {
      errorMessage = error.message;
    }
    console.log(errorMessage);
    const result: ServiceResponse<T> = {
      success: false,
      errors: [errorMessage],
    };

    return result;
}

export function handleAxiosSuccess<T>(response: AxiosResponse<T>): ServiceResponse<T> {
  const result: ServiceResponse<T> = {
    success: true,
    errors: [],
    data: response.data
  };

  return result;
}
