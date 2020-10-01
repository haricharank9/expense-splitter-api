import { JsonProperty } from "json-typescript-mapper";
class ModelError {
  property: string = "";
  constraints: {
    [name: string]: string;
  } = undefined;
  @JsonProperty({ clazz: ModelError })
  children: ModelError[] = [];
}

export class ClientError {
  @JsonProperty({ clazz: ModelError, name: "error" })
  errors: ModelError[] = [];
}
