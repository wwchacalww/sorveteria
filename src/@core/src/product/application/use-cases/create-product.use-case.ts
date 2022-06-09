import { Product } from "../../../product/domain/entities/product";
import Barcode from "../../../@seedwork/domain/value-objects/barcode.vo";
import ProductRepository from "../../../product/domain/repository/product.repository";
import { default as DefaultUseCase } from "../../../@seedwork/application/use-case";
import { ProductOutput, ProductOutputMapper } from "../dto/products-output";

export namespace CreateProductUseCase {
  export type Input = {
    name: string;
    description: string;
    category: string;
    barcode?: Barcode;
    is_active?: boolean;
  };

  export type Output = ProductOutput;
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private productRepo: ProductRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const product = new Product(input);
      await this.productRepo.insert(product);
      return ProductOutputMapper.toOutput(product);
    }
  }
}

export default CreateProductUseCase;
