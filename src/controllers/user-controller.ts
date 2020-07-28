import { Request, Response } from "express";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpPost,
  request,
  response
} from "inversify-express-utils";
import { TYPES } from "../constants/types";
import { validate } from "../middlewares/validation";
import { CreateUser } from "../models/request/create-user";
import { UserService } from "../services/user-service";

@controller("/users")
export class UserController extends BaseHttpController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {
    super();
  }
  @httpPost("/sign-up", validate<CreateUser>(CreateUser))
  public async createUser(@request() req: Request, @response() res: Response) {
    try {
      await this.userService.create(req.body);
      res.sendStatus(201);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}
