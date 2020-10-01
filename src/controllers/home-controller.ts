import { NextFunction, Request, Response } from "express";
import { httpGet, controller } from "inversify-express-utils";
@controller("/home")
export class HomeController {
  constructor() {}
  @httpGet("")
  getIndex(req: Request, res: Response, next: NextFunction) {
    return res.status(200).send({
      greeting: "Hello World"
    });
  }
}
