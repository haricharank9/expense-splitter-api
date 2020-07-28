import { json, urlencoded } from "body-parser";
import cors from "cors";
import { Errback, NextFunction, Request, Response } from "express";
import { InversifyExpressServer } from "inversify-express-utils";
import { validationError } from "./middlewares/validation";
import { IocContainer } from "./utils/ioc/container";

const errConfig = (
  err: Errback,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).json({ error: err || "Internal Server Error" });
};

export class App {
  private server: InversifyExpressServer;
  constructor() {
    this.server = new InversifyExpressServer(new IocContainer().getContainer())
      .setConfig(expApp => {
        expApp.use(json());
        expApp.use(urlencoded({ extended: true }));
        expApp.use(cors());
      })
      .setErrorConfig(expApp => {
        expApp.use(validationError);
        expApp.use(errConfig);
      });
  }
  start(port: number): Promise<number> {
    return new Promise((resolve, reject) => {
      this.server
        .build()
        .listen(port, () => {
          resolve(port);
        })
        .on("error", (err: object) => {
          reject(err);
        });
    });
  }
}
