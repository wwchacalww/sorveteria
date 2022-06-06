import ProductRepository from "../../domain/repository/product.repository";

export type InputGetProductDTO = {
  id: string;
};

export type OutputGetProductDTO = {
  id: string;
  name: string;
  description: string;
  category: string;
  barcode?: string;
  is_active?: boolean;
  created_at: Date;
  updated_at: Date;
};
export default class GetProductUseCase {
  constructor(private productRepo: ProductRepository.Repository) {}

  async execute(input: InputGetProductDTO): Promise<OutputGetProductDTO> {
    const product = await this.productRepo.findById(input.id);
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
