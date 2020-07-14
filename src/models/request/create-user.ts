import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class CreateUser {
  @IsNotEmpty()
  firstName: string = "";
  @IsNotEmpty()
  lastName: string = "";
  @IsOptional()
  middleName: string = "";
  @IsEmail()
  username: string = "";
}
