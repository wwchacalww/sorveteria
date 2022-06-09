import ProductRepository from "../../domain/repository/product.repository";
import { default as DefaultUseCase } from "../../../@seedwork/application/use-case";
import { ProductOutput, ProductOutputMapper } from "../dto/products-output";

export namespace GetProductUseCase {
  export type Input = {
    id: string;
  };

  export type Output = ProductOutput;
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private productRepo: ProductRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const product = await this.productRepo.findById(input.id);
      return ProductOutputMapper.toOutput(product);
    }
  }
}

export default GetProductUseCase;
