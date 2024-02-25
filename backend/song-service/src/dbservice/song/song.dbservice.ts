import { PrismaClient } from "@prisma/client";
import DBService from "../dbservice.interface.js";
import { SongCreateDTO } from "../../interfaces/song/createDTO.js";
import { SongUpdateDTO } from "../../interfaces/song/updateDTO.js";
import { Song } from "../../interfaces/song/object.js";
import { DataRecord } from "../../interfaces/dataRecord/index.js";

class SongDBService implements DBService<SongCreateDTO, SongUpdateDTO, Song> {
  constructor (
    private readonly database: PrismaClient
  ) {}

  static ErrorMessages = {
    create: "Failed to create song",
    findAll: "Failed to find songs",
    findId: "Failed to find song",
    update: "Failed to update song",
    delete: "Failed to delete song",
  }

  public async create(body: SongCreateDTO): Promise<Song> {
    try {
      const song = await this.database.song.create({
        data: body
      })

      return song;
    } catch (error) {
      throw new Error(SongDBService.ErrorMessages.create);
    }
  }

  public async findAll(): Promise<DataRecord<Song[]>> {
    try {
      const songs = await this.database.song.findMany();
      const count = await this.database.song.count();
      const result: DataRecord<Song[]> = {
        count,
        data: songs,
      }

      return result;
    } catch (error) {
      throw new Error(SongDBService.ErrorMessages.findAll);
    }
  }

  public async findById(id: number): Promise<Song> {
    try {
      const song = await this.database.song.findUnique({
        where: {
          id
        }
      });
      return song;
    } catch (error) {
      throw new Error(SongDBService.ErrorMessages.findId);
    }
  }

  public async update(id: number, body: Partial<SongUpdateDTO>): Promise<Song> {
    try {
      const song = await this.database.song.update({
        where: {
          id
        },
        data: body,
      });

      return song;
    } catch (error) {
      throw new Error(SongDBService.ErrorMessages.update);
    }
  }

  public async delete(id: number): Promise<Song> {
    try {
      const song = await this.database.song.delete({
        where: {
          id,
        },
      });

      return song;
    } catch (error) {
      throw new Error(SongDBService.ErrorMessages.delete);
    }
  }

}

export default SongDBService;
