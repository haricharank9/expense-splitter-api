import { ObjectID } from "mongodb";

export class SignUpData {
  _id?: ObjectID;
  firstName: string = "";
  lastName: string = "";
  middleName: string = "";
  username: string = "";
  password: string = "";
  isActive: boolean = false;
  createdDate: string = "";
}
