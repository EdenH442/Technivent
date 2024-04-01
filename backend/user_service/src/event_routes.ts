import { Request, Response } from "express";
import { EVENT_PATH, EVENT_SERVICE } from "./const.js";
import axios, { AxiosResponse } from "axios";

export async function getEventRoute(req: Request, res: Response) {
  try {
    const response: AxiosResponse = await axios.get(EVENT_SERVICE + EVENT_PATH);
    res.status(response.status).send(response.data);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
}