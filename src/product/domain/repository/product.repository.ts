import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from "../../../@seedwork/domain/repository/repository-contracts";
import { Product } from "../entities/product";

export namespace ProductRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<Product, Filter> {}

  export interface Repository
    extends SearchableRepositoryInterface<
      Product,
      Filter,
      SearchParams,
      SearchResult
    > {}
}

export default ProductRepository;
