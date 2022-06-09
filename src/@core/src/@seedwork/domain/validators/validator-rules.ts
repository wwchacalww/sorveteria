import ValidationError from "../errors/validation.error";
export class ValidatorRules {
  private constructor(private value: any, private property: string) {}
  static values(value: any, property: string) {
    return new ValidatorRules(value, property);
  }
  required(): this {
    if (this.value === undefined || this.value === null || this.value === "") {
      throw new ValidationError(`The ${this.property} is required`);
    }
    return this;
  }

  string(): this {
    if (!isEmpty(this.value) && typeof this.value !== "string") {
      throw new ValidationError(`The ${this.property} must be a string`);
    }
    return this;
  }

  maxLength(max: number): this {
    if (!isEmpty(this.value) && this.value.length > max) {
      throw new ValidationError(
        `The ${this.property} must be less or equal than ${max} characters`
      );
    }
    return this;
  }

  boolean(): this {
    if (!isEmpty(this.value) && typeof this.value !== "boolean") {
      throw new ValidationError(`The ${this.property} must be a boolean`);
    }
    return this;
  }
}

function isEmpty(value: any) {
  return value === undefined || value === null;
}

export default ValidatorRules;
