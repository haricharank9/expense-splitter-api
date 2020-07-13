import { Request, Response } from "express";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpGet,
  request,
  response
} from "inversify-express-utils";
import { UserService } from "../services/user-service";
import { TYPES } from "../constants/types";

@controller("/users")
export class UserController extends BaseHttpController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {
    super();
    this.userService = userService;
  }
  @httpGet("/create")
  public async createUser(@request() req: Request, @response() res: Response) {
    try {
      await this.userService.create(req.body);
      res.sendStatus(201);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}
