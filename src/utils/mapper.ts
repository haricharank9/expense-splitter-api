import { deserialize } from "json-typescript-mapper";
export type Constructor<T> = { new (): T };
export function mapper<U, V>(type: Constructor<U>, c2: V): U {
  return deserialize(type, c2);
}
