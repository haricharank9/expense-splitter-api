import { IsNotEmpty, IsEmail } from "class-validator";

export class LoginRequest {
  @IsNotEmpty()
  @IsEmail()
  username: string = "";
  @IsNotEmpty()
  password: string = "";
}
