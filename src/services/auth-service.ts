import { hash, compare } from "bcryptjs";
import { inject } from "inversify";
import { provide } from "inversify-binding-decorators";
import { sign } from "jsonwebtoken";
import { TYPES } from "../constants/types";
import { SignUpData } from "../models/data/signup-data";
import { MongoDBClient } from "../utils/mongodb/client";
import { collections } from "../utils/mongodb/collections";
import { CreateJwt } from "../models/domain/create-jwt";
import { environment } from "../environment/environment";
@provide(TYPES.AuthService)
export class AuthService {
  private _client: MongoDBClient;
  constructor(@inject(TYPES.MongoDBClient) mongoClient: MongoDBClient) {
    this._client = mongoClient;
  }

  async signUp(body: SignUpData): Promise<void> {
    const hashPassword = await hash(body.password, 12);
    body = { ...body, password: hashPassword };
    await this._client.insert<SignUpData>(collections.userLogin, body);
  }

  async getUserLogin(username: string): Promise<SignUpData> {
    const user = await this._client.find<SignUpData>(collections.userLogin, {
      username
    });
    return user.length ? user[0] : null;
  }

  async verifyPassword(
    password: string,
    passwordHash: string
  ): Promise<boolean> {
    return await compare(password, passwordHash);
  }

  loginUser(payload: CreateJwt): string {
    const jwt = sign({ userId: payload.userId }, environment.SIGNING_SECRET, {
      expiresIn: environment.TOKEN_EXPIRY,
      audience: environment.AUDIENCE,
      subject: payload.username
    });
    return jwt;
  }
}
