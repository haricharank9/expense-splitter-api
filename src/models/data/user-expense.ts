import { JsonProperty } from "json-typescript-mapper";
import { ObjectID } from "mongodb";
import { Payment } from "./payment";
import { Share } from "./share";
import { Type } from "class-transformer";

export class UserExpense {
  _id: ObjectID;
  expenseDetail: string = "";
  expenseAmount: string = "";
  @Type(() => Payment)
  payers: Payment[] = [];
  @Type(() => Share)
  shares: Share[] = [];
  createDate: string = "";
  createdById: ObjectID;
}
