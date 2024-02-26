import axios, { AxiosError, AxiosResponse } from "axios";
import { ErrorResponse } from "../../interfaces/errorResponse";
import { ServiceResponse } from "../../interfaces/serviceResponse";
import { DataRecord } from "../../interfaces/songService/dataRecord";
import { SongCreateDTO } from "../../interfaces/songService/song/createDTO";
import { Song } from "../../interfaces/songService/song/object";
import { SongUpdateDTO } from "../../interfaces/songService/song/updateDTO";
import { UserAuthentication } from "../../interfaces/userService/userAuthentication";
import serviceRegistry from "../serviceRegistry";
import { handleAxiosError, handleAxiosSuccess } from "../../utils/queryHandlers";

class SongServiceClient{

  // service currently returns Song[] but we do not need the body.
  // alternatively, create another endpoint to get just the metadata.
  static async findAll(): Promise<ServiceResponse<DataRecord<Song[]>>> {
    const res = await axios.get(`${serviceRegistry.songService}/songs/`)
      .then(handleAxiosSuccess<DataRecord<Song[]>>)
      .catch(handleAxiosError<DataRecord<Song[]>>);
    
    return res;
  }

  static async create(song: SongCreateDTO, user: UserAuthentication): Promise<ServiceResponse<Song>> {
    const res = await axios.post(`${serviceRegistry.songService}/songs/`, song, 
      { 
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
      }).then(handleAxiosSuccess<Song>)
        .catch(handleAxiosError<Song>);

    return res;
  }

  static async findById(id: number | string): Promise<ServiceResponse<Song>> {
    const res = await axios.get<Song>(`${serviceRegistry.songService}/songs/${id}`)
      .then(handleAxiosSuccess<Song>)
      .catch(handleAxiosError<Song>);

    return res;
  }

  static async update(input: Partial<SongUpdateDTO>, id: number | string, user: UserAuthentication): Promise<ServiceResponse<Song>> {
    const res = await axios.put<Song>(`${serviceRegistry.songService}/songs/${id}`, input, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
    }).then(handleAxiosSuccess<Song>)
      .catch(handleAxiosError<Song>);

    return res;
  }

  static async delete(id: number | string, user: UserAuthentication): Promise<ServiceResponse<Song>> {
    const res = await axios.delete<Song>(`${serviceRegistry.songService}/songs/${id}`, {
      headers: {
        'Authorization': `Bearer ${user.token}`
      },
    }).then(handleAxiosSuccess<Song>)
      .catch(handleAxiosError<Song>);

    return res;
  }
}

export default SongServiceClient
