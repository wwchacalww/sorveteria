import { ValueObject } from "./value-object";
import InvalidBarcodeError from "../../errors/invalid-barcode.error";

export default class Barcode extends ValueObject<string> {
  constructor(readonly barcode: string) {
    super(barcode);
    this.validate();
  }

  private validate(): void {
    const regex = /^[a-z A-Z0-9_\-]{5,30}$/;
    if (regex.test(this.barcode) === false) {
      throw new InvalidBarcodeError(this.value);
    }
  }
}
