import { Container } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";
import { makeLoggerMiddleware } from "inversify-logger-middleware";
// load all injectable entities.
// the @provide() annotation will then automatically register them.
import "../ioc/loader";

export class IocContainer {
  private _container: Container;
  constructor() {
    this._container = new Container();
    if (process.env.NODE_ENV === "development") {
      let logger = makeLoggerMiddleware();
      this._container.applyMiddleware(logger);
    }
    this._container.load(buildProviderModule());
  }

  getContainer(): Container {
    return this._container;
  }
}
