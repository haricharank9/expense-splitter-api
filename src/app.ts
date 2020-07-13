import { json, urlencoded } from "body-parser";
import cors from "cors";
import { InversifyExpressServer } from "inversify-express-utils";
import { IocContainer } from "./utils/ioc/container";

const errConfig = (err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
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
