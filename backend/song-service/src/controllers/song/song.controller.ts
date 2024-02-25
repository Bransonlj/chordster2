import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import SongParser from "../../parsers/song/song.parser.js";
import CRUDController from "../crudController.interface.js";
import SongDBService from "../../dbservice/song/song.dbservice.js";
import Controller from "../controller.abstract.js";
import { SongUpdateDTO } from "../../interfaces/song/updateDTO.js";
import { SongCreateDTO } from "../../interfaces/song/createDTO.js";
import { AuthenticatedRequest } from "../../interfaces/request/index.js";

class SongController extends Controller implements CRUDController {
  constructor(
    private readonly parser: SongParser,
    private readonly dbService: SongDBService,
  ) {
    super();
  }

  static ErrorMessages = {
    notFound: "Song not found",
    unauthorized: "User must be Author of the Song to complete action",
  }

  // PROTECTED ROUTE
  public create = async (req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => {
    let parsedSong: SongCreateDTO;
    try {
      const authorId = req.user.id;
      parsedSong = this.parser.parseCreateInput({...req.body, authorId});
    } catch (error) {
      return SongController.handleBadRequest(res, error.message);
    }

    try {
      const song = await this.dbService.create(parsedSong);
      return SongController.handleSuccess(res, song);
    } catch (error) {
      return SongController.handleServerError(res, error.message);
    }
  }

  public findAll = async (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => {
    try {
      const songs = await this.dbService.findAll();
      
      return SongController.handleSuccess(res, songs);
    } catch (error) {
      return SongController.handleServerError(res, error.message);
    }
  }

  public findById = async (req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) => {
    let parsedId: number;
    try {
      parsedId = this.parser.parseFindByIdInput(req.params.id);
    } catch (error) {
      return SongController.handleBadRequest(res, error.message);
    }

    try {
      const song = await this.dbService.findById(parsedId);
      if (!song) {
        return SongController.handleNotFound(res, SongController.ErrorMessages.notFound);
      }

      return SongController.handleSuccess(res, song);
    } catch (error) {
      return SongController.handleServerError(res, error.message);
    }
  }

  // PROTECTED ROUTE
  public update = async (req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => {
    let parsedId: number;
    let parsedUpdateInput: Partial<SongUpdateDTO>;
    try {
      parsedId = this.parser.parseFindByIdInput(req.params.id);
      parsedUpdateInput = this.parser.parseUpdateInput(req.body);
    } catch (error) {
      return SongController.handleBadRequest(res, error.message);
    }

    try {
      const songToUpdate = await this.dbService.findById(parsedId);
      if (!songToUpdate) {
        return SongController.handleNotFound(res, SongController.ErrorMessages.notFound);
      }
      if (songToUpdate.authorId !== req.user.id) {
        return SongController.handleUnauthorized(res, SongController.ErrorMessages.unauthorized);
      }
      const song = await this.dbService.update(parsedId, parsedUpdateInput);
      return SongController.handleSuccess(res, song);
    } catch (error) {
      return SongController.handleServerError(res, error.message);
    }
  }

  // PROTECTED ROUTE
  public delete = async (req: AuthenticatedRequest, res: Response<any, Record<string, any>>) => {
    let parsedId: number;
    try {
      parsedId = this.parser.parseFindByIdInput(req.params.id);
    } catch (error) {
      return SongController.handleBadRequest(res, error.message);
    }

    try {
      const songToDelete = await this.dbService.findById(parsedId);
      if (!songToDelete) {
        return SongController.handleNotFound(res, SongController.ErrorMessages.notFound);
      }
      if (songToDelete.authorId !== req.user.id) {
        return SongController.handleUnauthorized(res, SongController.ErrorMessages.unauthorized);
      }
      const song = await this.dbService.delete(parsedId);

      return SongController.handleSuccess(res, song);
    } catch (error) {
      return SongController.handleServerError(res, error.message);
    }
  }
}

export default SongController;
