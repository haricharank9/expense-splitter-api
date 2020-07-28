import { JsonProperty } from "json-typescript-mapper";
class ModelError {
  property: string = "";

  constraints: {
    [name: string]: string;
  } = undefined;
}

export class ClientError {
  @JsonProperty({ clazz: ModelError, name: "error" })
  errors: ModelError[] = [];
}
