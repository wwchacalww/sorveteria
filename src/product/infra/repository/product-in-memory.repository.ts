import { InMemorySearchableRepository } from "../../../@seedwork/domain/repository/in-memory.repository";
import { SortDirection } from "../../../@seedwork/domain/repository/repository-contracts";
import { Product } from "../../domain/entities/product";
import ProductRepository from "../../domain/repository/product.repository";

export default class ProductInMemoryRepository
  extends InMemorySearchableRepository<Product>
  implements ProductRepository.Repository
{
  sortableFields: string[] = [
    "name",
    "description",
    "category",
    "created_at",
    "updated_at",
  ];
  protected async applyFilter(
    items: Product[],
    filter: ProductRepository.Filter
  ): Promise<Product[]> {
    if (!filter) {
      return items;
    }
    return items.filter((i) => {
      return (
        i.props.name.toLowerCase().includes(filter.toLowerCase()) ||
        i.props.description.toLowerCase().includes(filter.toLowerCase()) ||
        i.props.category.toLowerCase().includes(filter.toLowerCase())
      );
    });
  }

  protected async applySort(
    items: Product[],
    sort: string | null,
    sort_dir: SortDirection | null
  ): Promise<Product[]> {
    return !sort
      ? super.applySort(items, "created_at", "desc")
      : super.applySort(items, sort, sort_dir);
  }
}
