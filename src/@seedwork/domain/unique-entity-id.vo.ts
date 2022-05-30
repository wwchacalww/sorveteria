import { v4 as uuidV4, validate as uuidValidate } from "uuid";
import InvalidUuidError from "../errors/invalid-uuid.error";

export default class UniqueEntityId {
  constructor(public readonly id?: string) {
    this.id = id ?? uuidV4();
    this.validate();
  }

  validate(): void {
    const isValid = uuidValidate(this.id);
    if (!isValid) {
      throw new InvalidUuidError(this.id);
    }
  }
}
