import { ObjectID } from "mongodb";
import { Type, Transform } from "class-transformer";

export class Payment {
  @Transform(value => new ObjectID(value))
  payerId: ObjectID;
  paymentAmount: string;
}
