import ProductRepository from "../../domain/repository/product.repository";
import UseCase from "../../../@seedwork/application/use-case";
import { ProductOutput, ProductOutputMapper } from "../dto/products-output";
export type Input = {
  id: string;
};

export type Output = ProductOutput;
export default class GetProductUseCase implements UseCase<Input, Output> {
  constructor(private productRepo: ProductRepository.Repository) {}

  async execute(input: Input): Promise<Output> {
    const product = await this.productRepo.findById(input.id);
    return ProductOutputMapper.toOutput(product);
  }
}
