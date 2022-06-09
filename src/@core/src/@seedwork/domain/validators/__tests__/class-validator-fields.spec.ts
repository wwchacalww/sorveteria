import { ClassValidatorFields } from "../class-validator-fields";
import * as libClassValidator from "class-validator";

class StubValidator extends ClassValidatorFields<{ field: string }> {}

describe("ClassValidatorFields Unit Test", () => {
  it("should initialize errors and validatedData variables with null ", () => {
    const validator = new StubValidator();
    expect(validator.errors).toBeNull();
    expect(validator.validatedData).toBeNull();
  });

  it("should validate with errors", () => {
    const spyValidateSync = jest.spyOn(libClassValidator, "validateSync");
    spyValidateSync.mockReturnValue([
      { property: "field", constraints: { isRequired: "Field is required" } },
    ]);
    const validator = new StubValidator();
    expect(validator.validate(null)).toBeFalsy();
    expect(spyValidateSync).toHaveBeenCalled();
    expect(validator.validatedData).toBeNull();
    expect(validator.errors).toStrictEqual({ field: ["Field is required"] });
  });

  it("should validate without errors", () => {
    const spyValidateSync = jest.spyOn(libClassValidator, "validateSync");
    spyValidateSync.mockReturnValue([]);
    const validator = new StubValidator();
    expect(validator.validate({ field: "value" })).toBeTruthy();
    expect(spyValidateSync).toHaveBeenCalled();
    expect(validator.validatedData).toStrictEqual({ field: "value" });
    expect(validator.errors).toBeNull();
  });
});
