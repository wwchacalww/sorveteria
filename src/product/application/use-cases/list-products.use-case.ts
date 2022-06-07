import ProductRepository from "../../domain/repository/product.repository";
import UseCase from "../../../@seedwork/application/use-case";
import { ProductOutput, ProductOutputMapper } from "../dto/products-output";
import { SearchInputDto } from "../../../@seedwork/application/dto/search-input";
import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from "../../../@seedwork/application/dto/pagination-output";

export type Input = SearchInputDto;

export type Output = PaginationOutputDto<ProductOutput>;
export default class ListProductsUseCase implements UseCase<Input, Output> {
  constructor(private productRepo: ProductRepository.Repository) {}

  async execute(input: Input): Promise<Output> {
    const params = new ProductRepository.SearchParams(input);
    const searchResult = await this.productRepo.search(params);
    return this.toOutPut(searchResult);
  }

  private toOutPut(searchResult: ProductRepository.SearchResult): Output {
    return {
      items: searchResult.items.map((item) =>
        ProductOutputMapper.toOutput(item)
      ),
      ...PaginationOutputMapper.toOutput(searchResult),
    };
  }
}
