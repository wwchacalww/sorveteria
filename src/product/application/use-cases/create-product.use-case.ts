import { Product } from "product/domain/entities/product";
import Barcode from "../../../@seedwork/domain/value-objects/barcode.vo";
import ProductRepository from "../../../product/domain/repository/product.repository";

export type InputCreateProductDTO = {
  name: string;
  description: string;
  category: string;
  barcode?: Barcode;
  is_active?: boolean;
};

export type OutputCreateProductDTO = {
  id: string;
  name: string;
  description: string;
  category: string;
  barcode?: Barcode;
  is_active?: boolean;
  created_at: Date;
  updated_at: Date;
};
export default class CreateProductUseCase {
  constructor(private productRepo: ProductRepository.Repository) {}

  async execute(input: InputCreateProductDTO): Promise<OutputCreateProductDTO> {
    const product = new Product(input);
    await this.productRepo.insert(product);
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.category,
      barcode: product.barcode,
      is_active: product.isActive,
      created_at: product.createdAt,
      updated_at: product.updatedAt,
    };
  }
}
