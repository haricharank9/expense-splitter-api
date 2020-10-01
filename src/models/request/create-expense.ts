import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  ValidateNested
} from "class-validator";
import { JsonProperty } from "json-typescript-mapper";

export class Sharer {
  @IsNotEmpty()
  sharerId: string = "";
  @IsNotEmpty()
  sharedAmount: string = "";
}

export class Payer {
  @IsNotEmpty()
  payerId: string = "";
  @IsNotEmpty()
  paymentAmount: string = "";
}
export class CreateExpense {
  @IsNotEmpty()
  expenseDetail: string = "";
  @IsNotEmpty()
  expenseAmount: string = "";
  @JsonProperty({ clazz: Payer })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested()
  payers: Payer[] = [];
  @JsonProperty({ clazz: Sharer })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested()
  shares: Sharer[] = [];
}
