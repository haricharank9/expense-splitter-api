import { BaseMiddleware } from "inversify-express-utils";
import { provide } from "inversify-binding-decorators";
import { NextFunction, Request, Response } from "express";
import { TYPES } from "../constants/types";
import { verify } from "jsonwebtoken";
import { environment } from "../environment/environment";

@provide(TYPES.Authorization)
export class Authorization extends BaseMiddleware {
  public handler(req: Request, res: Response, next: NextFunction) {
    const headerToken = req.headers["authorization"] as string;
    let decodedToken: any;
    try {
      decodedToken = verify(
        headerToken.split(" ")[1],
        environment.SIGNING_SECRET
      );
    } catch (error) {
      res.status(401);
      next(error);
    }
    if (decodedToken) {
      req.headers["userId"] = decodedToken.userId;
      next();
    } else {
      res.status(401).json({ error: "Unable to parse auth token" });
    }
  }
}
