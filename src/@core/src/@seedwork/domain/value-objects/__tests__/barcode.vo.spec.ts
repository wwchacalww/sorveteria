import InvalidBarcodeError from "../../errors/invalid-barcode.error";
import Barcode from "../barcode.vo";

describe("Barcode Unit Test", () => {
  it("should throw error when barcode is invalid", () => {
    const validateSpy = jest.spyOn(Barcode.prototype as any, "validate");
    expect(() => new Barcode("9".repeat(31))).toThrow(
      new InvalidBarcodeError("9".repeat(31))
    );
    expect(() => new Barcode("1234")).toThrow(new InvalidBarcodeError("1234"));
    expect(() => new Barcode("1234^42")).toThrow(
      new InvalidBarcodeError("1234^42")
    );
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept valid barcode", () => {
    const validateSpy = jest.spyOn(Barcode.prototype as any, "validate");
    let barcode = new Barcode("12908082309834");
    expect(barcode.value).toBe("12908082309834");
    barcode = new Barcode("129 0808230 983");
    expect(barcode.value).toBe("129 0808230 983");
    barcode = new Barcode("129a7516Ke654-46548_a342");
    expect(barcode.value).toBe("129a7516Ke654-46548_a342");
    expect(validateSpy).toHaveBeenCalled();
  });
});
