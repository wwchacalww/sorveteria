export default class InvalidBarcodeError extends Error {
  constructor(barcode: string, message?: string) {
    super(message || `${barcode} is not a valid barcode`);
    this.name = "InvalidBarcodeError";
  }
}
