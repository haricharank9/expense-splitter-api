import { ObjectID } from "mongodb";
import { Type, Transform } from "class-transformer";

export class Share {
  @Transform(value => new ObjectID(value))
  sharerId: ObjectID;
  sharedAmount: string;
}
