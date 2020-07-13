import { fluentProvide } from "inversify-binding-decorators";
export const provideSingleton = (instance: symbol | string) =>
  fluentProvide(instance).inSingletonScope().done();
