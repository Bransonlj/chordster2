import { SongMetaData } from "../../interfaces/songService/songMetaData";
import serviceRegistry from "../serviceRegistry";

const serviceUri = serviceRegistry.songService;

// TODO move to general scope
export type ControllerResponse<Obj> = {
  success: boolean;
  errors: string[];
  data?: Obj;
};

export async function getAllSongs(): Promise<ControllerResponse<SongMetaData[]>> {
  try {
    const res = await fetch(`${serviceUri}/api/songs/`, {
      method: "GET",
    })
  
    const data = await res.json();
    if (!res.ok) {
      console.log(data)
      throw Error(data.error)
    }
    const result: ControllerResponse<SongMetaData[]> = {
      success: true,
      errors: [],
      data: data.data,
    };

    return result;
  } catch (error: any) {
    const result: ControllerResponse<SongMetaData[]> = {
      success: false,
      errors: [error.message],
    };

    return result;
  }
}

export async function createSong() {

}