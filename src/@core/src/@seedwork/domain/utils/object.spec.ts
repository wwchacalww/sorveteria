import { deepFreeze } from "./object";

describe("Object Unit Tests", () => {
  it("should not freeze a scalar value", () => {
    const str = deepFreeze("test");
    expect(typeof str).toBe("string");
    const num = deepFreeze(5);
    expect(typeof num).toBe("number");
    const bol = deepFreeze(true);
    expect(typeof bol).toBe("boolean");
    const obj = deepFreeze({ prop: "value" });
    expect(typeof obj).toBe("object");
  });
  it("should a immutable object", () => {
    const obj = deepFreeze({ prop: "value", deep: { date: new Date() } });
    expect(() => ((obj as any).deep.date = "asdflasd")).toThrow(
      "Cannot assign to read only property 'date' of object '#<Object>'"
    );
    expect(obj.deep.date).toBeInstanceOf(Date);
  });
});
