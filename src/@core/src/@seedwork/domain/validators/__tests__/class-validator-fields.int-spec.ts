import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { ClassValidatorFields } from "../class-validator-fields";

class StubRules {
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  constructor(data: any) {
    Object.assign(this, data);
  }
}

class StubClassValidatorFields extends ClassValidatorFields<StubRules> {
  validate(data: any): boolean {
    return super.validate(new StubRules(data));
  }
}

describe("ClassValidatorFields Integrations Tests", () => {
  it("should initialize errors and validatedData variables with null ", () => {
    const validator = new StubClassValidatorFields();
    expect(validator.errors).toBeNull();
    expect(validator.validatedData).toBeNull();
    expect(validator.validate(null)).toBeFalsy();
    expect(validator.errors).toStrictEqual({
      name: [
        "name should not be empty",
        "name must be a string",
        "name must be shorter than or equal to 50 characters",
      ],
      price: [
        "price should not be empty",
        "price must be a number conforming to the specified constraints",
      ],
    });
  });

  it("should be valid", () => {
    const validator = new StubClassValidatorFields();
    expect(validator.validate({ name: "name", price: 1 })).toBeTruthy();
    expect(validator.validatedData).toStrictEqual(
      new StubRules({
        name: "name",
        price: 1,
      })
    );
    expect(validator.errors).toBeNull();
  });
});
