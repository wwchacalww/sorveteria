import ProductRepository from "../../domain/repository/product.repository";
import { default as DefaultUseCase } from "../../../@seedwork/application/use-case";
import { ProductOutput, ProductOutputMapper } from "../dto/products-output";

export namespace UpdateProductUseCase {
  export type Input = {
    id: string;
    name: string;
    description: string;
    barcode?: string;
    is_active?: boolean;
  };

  export type Output = ProductOutput;
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private productRepo: ProductRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const { id, name, description } = input;
      const product = await this.productRepo.findById(id);
      product.changeName(name);
      product.changeDescription(description);
      if (input.barcode) {
        product.changeBarcode(input.barcode);
      }
      if (input.is_active === true) {
        product.activate();
      }
      if (input.is_active === false) {
        product.desactivate();
      }
      await this.productRepo.update(product);
      return ProductOutputMapper.toOutput(product);
    }
  }
}

export default UpdateProductUseCase;
