import { Product } from "product/domain/entities/product";

export type ProductOutput = {
  id: string;
  name: string;
  description: string;
  category: string;
  barcode?: string;
  is_active?: boolean;
  created_at: Date;
  updated_at: Date;
};

export class ProductOutputMapper {
  static toOutput(product: Product): ProductOutput {
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.category,
      barcode: product.barcode ? product.barcode.value : null,
      is_active: product.isActive,
      created_at: product.createdAt,
      updated_at: product.updatedAt,
    };
  }
}
