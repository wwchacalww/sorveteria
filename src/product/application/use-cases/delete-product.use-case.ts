import ProductRepository from "../../domain/repository/product.repository";
import UseCase from "../../../@seedwork/application/use-case";
export type Input = {
  id: string;
};

export type Output = void;
export default class DeleteProductUseCase implements UseCase<Input, Output> {
  constructor(private productRepo: ProductRepository.Repository) {}

  async execute(input: Input): Promise<Output> {
    await this.productRepo.delete(input.id);
  }
}
