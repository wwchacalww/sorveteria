import { Product } from "../../../product/domain/entities/product";
import Barcode from "../../../@seedwork/domain/value-objects/barcode.vo";
import ProductRepository from "../../../product/domain/repository/product.repository";
import UseCase from "../../../@seedwork/application/use-case";
import { ProductOutput } from "../dto/products-output.dto";

export type Input = {
  name: string;
  description: string;
  category: string;
  barcode?: Barcode;
  is_active?: boolean;
};

export type Output = ProductOutput;
export default class CreateProductUseCase implements UseCase<Input, Output> {
  constructor(private productRepo: ProductRepository.Repository) {}

  async execute(input: Input): Promise<Output> {
    const product = new Product(input);
    await this.productRepo.insert(product);
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
