import UniqueEntityId from "../../../@seedwork/domain/value-objects/unique-entity-id.vo";

export type ProductProps = {
  name: string;
  description: string;
  category: string;
  barcode?: string;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
};

export class Product {
  public readonly id: UniqueEntityId;
  constructor(public readonly props: ProductProps, id?: UniqueEntityId) {
    this.id = id || new UniqueEntityId();
    this.isActive = this.props.is_active ?? true;
    this.barcode = this.props.barcode ?? "";
    this.props.created_at = this.props.created_at ?? new Date();
    this.updatedAt = this.props.updated_at ?? new Date();
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

  get barcode(): string {
    return this.props.barcode ?? "";
  }
  private set barcode(value: string) {
    this.props.barcode = value ?? "";
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
}
