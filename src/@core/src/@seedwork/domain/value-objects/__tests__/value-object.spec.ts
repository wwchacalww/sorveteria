import { ValueObject } from "../value-object";

class StubValueObject extends ValueObject {}
describe("ValueObject Unit Test", () => {
  it("should set value", () => {
    let valueObject = new StubValueObject("teste");
    expect(valueObject.value).toBe("teste");
    valueObject = new StubValueObject({ prop: "value prop" });
    expect(valueObject.value).toStrictEqual({ prop: "value prop" });
  });

  it("should return string value", () => {
    const date = new Date();
    const arrange = [
      { value: 5, expected: "5" },
      { value: 0, expected: "0" },
      { value: -1, expected: "-1" },
      { value: false, expected: "false" },
      { value: true, expected: "true" },
      { value: date, expected: date.toString() },
      { value: "Fake Teste", expected: "Fake Teste" },
      {
        value: { prop1: "value" },
        expected: JSON.stringify({ prop1: "value" }),
      },
    ];

    arrange.forEach(({ value, expected }) => {
      const valueObject = new StubValueObject(value);
      expect(valueObject.toString()).toBe(expected);
    });
  });

  it("should a immutable object", () => {
    const obj = { prop: "value", deep: { date: new Date() } };
    const valueObject = new StubValueObject(obj);
    expect(() => {
      (valueObject as any).value.deep.date = "asdflasd";
    }).toThrow(
      "Cannot assign to read only property 'date' of object '#<Object>'"
    );
    expect(valueObject.value.deep.date).toBeInstanceOf(Date);
  });
});
