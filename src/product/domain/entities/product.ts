import Barcode from "../../../@seedwork/domain/value-objects/barcode.vo";
import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";
import Entity from "../../../@seedwork/domain/entity/entity";
import ValidatorRules from "../../../@seedwork/domain/validators/validator-rules";
import ProductValidatorFactory from "../validators/product.validator";
import { EntityValidationError } from "../../../@seedwork/domain/errors/validation.error";
export type ProductProps = {
  name: string;
  description: string;
  category: string;
  barcode?: Barcode;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
};

export class Product extends Entity<ProductProps> {
  constructor(public readonly props: ProductProps, id?: UniqueEntityId) {
    Product.validate(props);
    super(props, id);
    this.isActive = this.props.is_active ?? true;
    this.barcode = this.props.barcode ?? null;
    this.props.created_at = this.props.created_at ?? new Date();
    this.updatedAt = this.props.updated_at ?? new Date();
  }

  // static validate(
  //   props: Omit<ProductProps, "created_at" | "updated_at" | "barcode">
  // ): void {
  //   const { name, description, category, is_active } = props;
  //   ValidatorRules.values(name, "name").required().string().maxLength(50);
  //   ValidatorRules.values(description, "description")
  //     .required()
  //     .string()
  //     .maxLength(150);
  //   ValidatorRules.values(category, "category")
  //     .required()
  //     .string()
  //     .maxLength(30);
  //   ValidatorRules.values(is_active, "is_active").boolean();
  // }

  static validate(props: Omit<ProductProps, "barcode">) {
    const validator = ProductValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  get name(): string {
    return this.props.name;
  }
  private set name(value: string) {
    this.props.name = value;
  }

  get description(): string {
    return this.props.description;
  }
  private set description(value: string) {
    this.props.description = value;
  }

  get category(): string {
    return this.props.category;
  }
  private set category(value: string) {
    this.props.category = value;
  }

  get code(): string {
    return this.barcode.value;
  }
  get barcode(): Barcode {
    return this.props.barcode ?? null;
  }
  private set barcode(value: Barcode) {
    this.props.barcode = value ?? null;
  }

  get isActive() {
    return this.props.is_active;
  }
  private set isActive(value: boolean) {
    this.props.is_active = value ?? true;
  }

  get createdAt() {
    return this.props.created_at;
  }

  get updatedAt() {
    return this.props.updated_at;
  }
  private set updatedAt(value: Date) {
    this.props.updated_at = value ?? new Date();
  }

  changeName(name: string) {
    ValidatorRules.values(name, "name").required().string().maxLength(50);
    this.name = name;
  }

  changeDescription(description: string) {
    ValidatorRules.values(description, "description")
      .required()
      .string()
      .maxLength(150);
    this.description = description;
  }

  changeBarcode(barcode: string) {
    ValidatorRules.values(barcode, "barcode").required().string().maxLength(30);
    this.barcode = new Barcode(barcode);
  }

  activate() {
    this.isActive = true;
  }

  desactivate() {
    this.isActive = false;
  }
}
