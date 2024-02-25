import { Query } from "../../interfaces/query/index.js";
import { SongCreateDTO } from "../../interfaces/song/createDTO.js";
import { Song } from "../../interfaces/song/object.js";
import { SongUpdateDTO } from "../../interfaces/song/updateDTO.js";
import CRUDParser, { StringInterface } from "../crudParser.interface.js";

class SongParser
  implements CRUDParser<SongCreateDTO, SongUpdateDTO, Song> {

    static ErrorMessages = {
      title: "Invalid title",
      artist: "Invalid artist",
      authorId: "Invalid author",
      body: "Invalid body",
      id: "Invalid ID",
    }

    public parseCreateInput(input: StringInterface<SongCreateDTO>): SongCreateDTO {
      if (!input.title) throw new Error(SongParser.ErrorMessages.title);
      if (!input.artist) throw new Error(SongParser.ErrorMessages.artist);
      if (!input.body) throw new Error(SongParser.ErrorMessages.body);
      if (!input.authorId) throw new Error(SongParser.ErrorMessages.authorId);

      return {
        title: input.title,
        artist: input.artist,
        authorId: input.authorId,
        body: input.body,
      }
    }

    public parseFindByIdInput(id: string): number {
      if (!id) throw new Error(SongParser.ErrorMessages.id); // TODO store all error messages as const.
      const intId = parseInt(id, 10);
      if (isNaN(intId)) {
        throw new Error(SongParser.ErrorMessages.id);
      }

      return intId;
    }

    parseUpdateInput(input: Partial<StringInterface<SongUpdateDTO>>): Partial<SongUpdateDTO> {
      const parsedInput: Partial<SongUpdateDTO> = {};
      parsedInput.title = input.title;
      parsedInput.artist = input.artist;
      parsedInput.body = input.body;
      
      return parsedInput;
    }
  }

export default SongParser;