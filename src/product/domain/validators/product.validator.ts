import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import { ClassValidatorFields } from "../../../@seedwork/domain/validators/class-validator-fields";
import { Product, ProductProps } from "../entities/product";

export class ProductRules {
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  name: string;

  @MaxLength(30)
  @IsString()
  @IsNotEmpty()
  category: string;

  @MaxLength(150)
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsOptional()
  is_ative: boolean;

  @IsDate()
  @IsOptional()
  created_at: Date;

  @IsDate()
  @IsOptional()
  updated_at: Date;

  constructor({
    name,
    category,
    description,
    is_active,
    created_at,
    updated_at,
  }: ProductProps) {
    Object.assign(this, {
      name,
      category,
      description,
      is_active,
      created_at,
      updated_at,
    });
  }
}

export class ProductValidator extends ClassValidatorFields<ProductRules> {
  validate(data: ProductProps): boolean {
    return super.validate(new Product(data));
  }
}

export default class ProductValidatorFactory {
  static create() {
    return new ProductValidator();
  }
}
