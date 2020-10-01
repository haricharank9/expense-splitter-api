import { provide } from "inversify-binding-decorators";
import { TYPES } from "../constants/types";
import { MongoDBClient, collections } from "../utils/mongodb";
import { inject } from "inversify";
import { UserExpense } from "../models/data/user-expense";

@provide(TYPES.ExpenseService)
export class ExpensesService {
  private _client: MongoDBClient;
  constructor(@inject(TYPES.MongoDBClient) mongoClient: MongoDBClient) {
    this._client = mongoClient;
  }

  async createExpense(body: UserExpense) {
    await this._client.insert<UserExpense>(collections.expense, body);
  }
}
