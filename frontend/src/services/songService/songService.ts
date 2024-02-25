import { ErrorResponse } from "../../interfaces/errorResponse";
import { ServiceResponse } from "../../interfaces/serviceResponse";
import { DataRecord } from "../../interfaces/songService/dataRecord";
import { SongMetaData } from "../../interfaces/songService/songMetaData";
import serviceRegistry from "../serviceRegistry";

const serviceUri = serviceRegistry.songService;

// service currently returns Song[] but we do not need the body.
export async function getAllSongs(): Promise<ServiceResponse<DataRecord<SongMetaData[]>>> {
  try {
    const res = await fetch(`${serviceUri}/songs/`, {
      method: "GET",
    })
  
    if (!res.ok) {
      const data: ErrorResponse = await res.json()
      console.log(data)
      throw Error(data.message);
    }

    const data: DataRecord<SongMetaData[]> = await res.json();

    const result: ServiceResponse<DataRecord<SongMetaData[]>> = {
      success: true,
      errors: [],
      data: data,
    };

    return result;
  } catch (error: any) {
    const result: ServiceResponse<DataRecord<SongMetaData[]>> = {
      success: false,
      errors: [error.message],
    };

    return result;
  }
}

export async function createSong() {

}