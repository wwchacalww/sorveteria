import ValidationError from "../../errors/validation.error";
export default class ValidatorRules {
  private constructor(private value: any, private property: string) {}
  static value(value: any, property: string) {
    return new ValidatorRules(value, property);
  }
  required(): this {
    if (this.value === undefined || this.value === null || this.value === "") {
      throw new ValidationError(`${this.property} is required`);
    }
    return this;
  }

  string(): this {
    if (typeof this.value !== "string") {
      throw new ValidationError(`${this.property} must be a string`);
    }
    return this;
  }

  maxLength(max: number): this {
    if (this.value.length > max) {
      throw new ValidationError(
        `${this.property} must be less than ${max} characters`
      );
    }
    return this;
  }
}
