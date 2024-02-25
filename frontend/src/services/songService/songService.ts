import { ErrorResponse } from "../../interfaces/errorResponse";
import { ServiceResponse } from "../../interfaces/serviceResponse";
import { DataRecord } from "../../interfaces/songService/dataRecord";
import { SongCreateDTO } from "../../interfaces/songService/song/createDTO";
import { Song } from "../../interfaces/songService/song/object";
import { SongUpdateDTO } from "../../interfaces/songService/song/updateDTO";
import { UserAuthentication } from "../../interfaces/userService/userAuthentication";
import serviceRegistry from "../serviceRegistry";

class SongService{

  // service currently returns Song[] but we do not need the body.
  // alternatively, create another endpoint to get just the metadata.
  static async findAll(): Promise<ServiceResponse<DataRecord<Song[]>>> {
    try {
      const res = await fetch(`${serviceRegistry.songService}/songs/`, {
        method: "GET",
      })
    
      if (!res.ok) {
        const data: ErrorResponse = await res.json()
        console.log(data)
        throw Error(data.message);
      }

      const data: DataRecord<Song[]> = await res.json();

      const result: ServiceResponse<DataRecord<Song[]>> = {
        success: true,
        errors: [],
        data: data,
      };

      return result;
    } catch (error: any) {
      const result: ServiceResponse<DataRecord<Song[]>> = {
        success: false,
        errors: [error.message],
      };

      return result;
    }
  }

  static async create(song: SongCreateDTO, user: UserAuthentication): Promise<ServiceResponse<Song>> {
    try {
      const res = await fetch(`${serviceRegistry.songService}/songs/`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(song),
      });

      if (!res.ok) {
        const data: ErrorResponse = await res.json();
        console.log(data)
        throw Error(data.message);
      }

      const data: Song = await res.json();
      const result: ServiceResponse<Song> = {
        success: true,
        errors: [],
        data: data,
      };

      return result;
    } catch (error: any) {
      const result: ServiceResponse<Song> = {
        success: false,
        errors: [error.message],
      };

      return result;
    }
  }

  static async findById(id: number | string): Promise<ServiceResponse<Song>> {
    try {
      const res = await fetch(`${serviceRegistry.songService}/songs/${id}`, {
        method: "GET",
      })
    
      if (!res.ok) {
        const data: ErrorResponse = await res.json()
        console.log(data)
        throw Error(data.message);
      }

      const data: Song = await res.json();

      const result: ServiceResponse<Song> = {
        success: true,
        errors: [],
        data: data,
      };

      return result;
    } catch (error: any) {
      const result: ServiceResponse<Song> = {
        success: false,
        errors: [error.message],
      };

      return result;
    }
  }

  static async update(input: Partial<SongUpdateDTO>, id: number | string, user: UserAuthentication): Promise<ServiceResponse<Song>> {
    try {
      const res = await fetch(`${serviceRegistry.songService}/songs/${id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify(input),
      })
    
      if (!res.ok) {
        const data: ErrorResponse = await res.json()
        console.log(data)
        throw Error(data.message);
      }

      const data: Song = await res.json();

      const result: ServiceResponse<Song> = {
        success: true,
        errors: [],
        data: data,
      };

      return result;
    } catch (error: any) {
      const result: ServiceResponse<Song> = {
        success: false,
        errors: [error.message],
      };

      return result;
    }
  }

  static async delete(id: number | string, user: UserAuthentication): Promise<ServiceResponse<Song>> {
    try {
      const res = await fetch(`${serviceRegistry.songService}/songs/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${user.token}`
        },
      })
    
      if (!res.ok) {
        const data: ErrorResponse = await res.json()
        console.log(data)
        throw Error(data.message);
      }

      const data: Song = await res.json();

      const result: ServiceResponse<Song> = {
        success: true,
        errors: [],
        data: data,
      };

      return result;
    } catch (error: any) {
      const result: ServiceResponse<Song> = {
        success: false,
        errors: [error.message],
      };

      return result;
    }
  }

}

export default SongService
