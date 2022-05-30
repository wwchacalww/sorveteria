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
  constructor(public readonly props: ProductProps) {
    this.props.is_active = this.props.is_active ?? true;
    this.props.created_at = this.props.created_at ?? new Date();
    this.props.updated_at = this.props.updated_at ?? new Date();
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  get category(): string {
    return this.props.category;
  }

  get barcode(): string {
    return this.props.barcode ?? "";
  }

  get isActive() {
    return this.props.is_active;
  }

  get createdAt() {
    return this.props.created_at;
  }
}
