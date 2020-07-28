import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Matches,
  MinLength
} from "class-validator";

export class SignUp {
  @IsNotEmpty()
  @MinLength(2)
  firstName: string = "";
  @IsNotEmpty()
  @MinLength(2)
  lastName: string = "";
  @IsOptional()
  middleName: string = "";
  @IsEmail()
  @IsNotEmpty()
  username: string = "";
  @IsNotEmpty()
  @MinLength(6)
  password: string = "";
}
