import ProductRepository from "../../domain/repository/product.repository";
import UseCase from "../../../@seedwork/application/use-case";
import { ProductOutput } from "../dto/products-output.dto";
import { SearchInputDto } from "../../../@seedwork/application/dto/search-input.dto";
import { PaginationOutputDto } from "../../../@seedwork/application/dto/pagination-output.dto";

export type Input = SearchInputDto;

export type Output = PaginationOutputDto<ProductOutput>;
export default class ListProductsUseCase implements UseCase<Input, Output> {
  constructor(private productRepo: ProductRepository.Repository) {}

  async execute(input: Input): Promise<Output> {
    const params = new ProductRepository.SearchParams(input);
    const searchResult = await this.productRepo.search(params);
    return {
      items: searchResult.items.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        category: item.category,
        barcode: item.barcode.value,
        is_active: item.isActive,
        created_at: item.createdAt,
        updated_at: item.updatedAt,
      })),
      total: searchResult.total,
      current_page: searchResult.current_page,
      per_page: searchResult.per_page,
      last_page: searchResult.last_page,
    };
  }
}
