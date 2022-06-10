import { SortDirection } from '@core/sorveteria-hakuna/dist/@seedwork/domain/repository/repository-contracts';
import { ListProductsUseCase } from '@core/sorveteria-hakuna/product/application';

export class SearchProductDto implements ListProductsUseCase.Input {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirection | null;
  filter?: string | null;
}
