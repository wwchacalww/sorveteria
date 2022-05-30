import InvalidUuidError from "../../../errors/invalid-uuid.error";
import UniqueEntityId from "../unique-entity-id.vo";
import { validate as uuidValidate } from "uuid";

describe("UniqueentityId Unit Test", () => {
  it("should throw error when id is invalid", () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");
    expect(() => new UniqueEntityId("invalid_id")).toThrow(
      new InvalidUuidError("invalid_id")
    );
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept valid id", () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");
    const id = "f0a8f8a7-e8e2-4f7f-b8f8-f8a7e8e24f7f";
    const uniqueEntityId = new UniqueEntityId(id);
    expect(uniqueEntityId.value).toBe(id);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should generate a valid id", () => {
    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, "validate");
    const id = new UniqueEntityId().value;
    expect(uuidValidate(id)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});
