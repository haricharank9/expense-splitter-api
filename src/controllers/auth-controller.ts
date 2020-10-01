import { Request, Response } from "express";
import { inject } from "inversify";
import {
  BaseHttpController,
  controller,
  httpPost,
  request,
  response
} from "inversify-express-utils";
import { SignUp } from "../models/request/signup";
import { AuthService } from "../services";
import { TYPES } from "../constants/types";
import { validate } from "../middlewares";
import { mapper } from "../utils/mapper";
import { SignUpData } from "../models/data/signup-data";
import { LoginRequest } from "../models/request/login-request";
import { Login } from "../models/domain/login";
import { LoginResponse } from "../models/response/login-response";

@controller("/auth")
export class AuthController extends BaseHttpController {
  constructor(@inject(TYPES.AuthService) private authService: AuthService) {
    super();
  }

  @httpPost("/signup", validate<SignUp>(SignUp))
  public async signUp(@request() req: Request, @response() res: Response) {
    try {
      const existingUser = await this.authService.getUserLogin(
        req.body.username.toLowerCase()
      );
      if (existingUser && existingUser.isActive) {
        res.status(409).json({ error: "Username not available" });
      } else {
        const signUpBody: SignUpData = mapper(SignUpData, req.body);
        signUpBody.createdDate = new Date().toISOString();
        signUpBody.isActive = true;
        signUpBody.username = signUpBody.username.toLowerCase();
        await this.authService.signUp(signUpBody);
        res.sendStatus(201);
      }
    } catch (err) {
      throw err.message;
    }
  }

  @httpPost("/login", validate<LoginRequest>(LoginRequest))
  public async userLogin(@request() req: Request, @response() res: Response) {
    try {
      const loginBody: Login = mapper(Login, req.body);
      const userDetails = await this.authService.getUserLogin(
        loginBody.username
      );
      if (
        userDetails &&
        (await this.authService.verifyPassword(
          loginBody.password,
          userDetails.password
        ))
      ) {
        const jwt = this.authService.loginUser({
          username: userDetails.username,
          userId: userDetails._id.toString()
        });
        const loginResponse: LoginResponse = {
          auth_token: jwt
        };
        res.status(200).json(loginResponse);
      } else {
        throw new Error("Invalid Credentials");
      }
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  }
}
