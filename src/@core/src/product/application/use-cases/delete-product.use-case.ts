import ProductRepository from "../../domain/repository/product.repository";
import { default as DefaultUseCase } from "../../../@seedwork/application/use-case";

export namespace DeleteProductUseCase {
  export type Input = {
    id: string;
  };
  export type Output = void;
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private productRepo: ProductRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      await this.productRepo.delete(input.id);
    }
  }
}

export default DeleteProductUseCase;
