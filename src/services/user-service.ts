import { inject } from "inversify";
import { TYPES } from "../constants/types";
import { provide } from "inversify-binding-decorators";
import { IUser } from "../models/data/IUser";
import { MongoDBClient } from "../utils/mongodb/client";

@provide(TYPES.UserService)
export class UserService {
  private _client: MongoDBClient;
  constructor(@inject(TYPES.MongoDBClient) mongoClient: MongoDBClient) {
    this._client = mongoClient;
  }
  async create(body: IUser): Promise<IUser> {
    const user = await this._client.insert<IUser>("user", body);
    return user[0];
  }
}
