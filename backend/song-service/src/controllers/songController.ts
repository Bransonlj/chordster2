import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
export async function getAllSongs(req: Request, res: Response) {
  try {
    const result = await prisma.song.findMany({
      select: {
        id: true,
        title: true,
        artist: true,
        authorId: true,
        createdAt: true,
        updatedAt: true,
      }
    });
  
    res.status(200).json({data: result});
  } catch (error) {
    res.status(500).json("failed to get songs");
  }

}


export async function createSong(req: Request, res: Response) {
  const {title, artist, authorId, body} = req.body;
  try {
    const result = await prisma.song.create({
      data: {
        title,
        artist,
        authorId,
        body,
      }
    })

    res.status(201).json({data: result});
  } catch (error) {
    res.status(500).json("failed to get songs");
  }
}