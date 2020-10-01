import { authorizedController } from "../utils/ioc/authorized-controller";
import { httpPost, request, response } from "inversify-express-utils";
import { Response } from "express";
import { TYPES } from "../constants/types";
import { inject } from "inversify";
import { ExpensesService } from "../services";
import { validate } from "../middlewares";
import { CreateExpense, Payer, Sharer } from "../models/request/create-expense";
import { mapper } from "../utils/mapper";
import { UserExpense } from "../models/data/user-expense";
import { ObjectID } from "mongodb";
import { plainToClass } from "class-transformer";

@authorizedController("/expenses")
export class ExpensesController {
  constructor(
    @inject(TYPES.ExpenseService) private expenseService: ExpensesService
  ) {}
  @httpPost("/create", validate<CreateExpense>(CreateExpense))
  async createExpense(@request() req: Request, @response() res: Response) {
    try {
      if (this.checkAmountDiscrepancy(req.body)) {
        const createExpenseData: UserExpense = plainToClass(
          UserExpense,
          req.body
        );
        createExpenseData.createdById = new ObjectID(req.headers["userId"]);
        createExpenseData.createDate = new Date().toISOString();
        await this.expenseService.createExpense(createExpenseData);
        res.sendStatus(201);
      } else {
        res.status(400).json({ error: "Discrepancy in payers and sharers" });
      }
    } catch (err) {
      throw err.message;
    }
  }

  private checkAmountDiscrepancy(body: any) {
    return (
      parseInt(body.expenseAmount) ===
        body.payers.reduce(
          (total: number, current: Payer): number =>
            total + parseInt(current.paymentAmount),
          0
        ) &&
      parseInt(body.expenseAmount) ===
        body.shares.reduce(
          (total: number, current: Sharer): number =>
            total + parseInt(current.sharedAmount),
          0
        )
    );
  }
}
