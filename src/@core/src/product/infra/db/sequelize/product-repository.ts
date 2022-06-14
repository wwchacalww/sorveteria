import { Product } from "#product/domain";
import ProductRepository from "#product/domain/repository/product.repository";
import { NotFoundError, UniqueEntityId } from "#seedwork/domain";
import { Op } from "sequelize";
import { ProductMapper } from "./product-mapper";
import { ProductModel } from "./product-model";

export class ProductSequelizeRepository
  implements ProductRepository.Repository
{
  constructor(private productModel: typeof ProductModel) {}
  sortableFields: string[] = ["name", "description", "created_at"];
  async insert(entity: Product): Promise<void> {
    await this.productModel.create(entity.toOutput());
  }

  async findById(id: string | UniqueEntityId): Promise<Product> {
    return await this._get(`${id}`);
  }

  async findAll(): Promise<Product[]> {
    const models = await this.productModel.findAll();
    return models.map((model) => ProductMapper.toEntity(model));
  }

  async update(entity: Product): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async delete(id: string | UniqueEntityId): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async _get(id: string): Promise<Product> {
    const product = await this.productModel.findByPk(id, {
      rejectOnEmpty: new NotFoundError(`Entity not found with id: ${id}`),
    });

    return ProductMapper.toEntity(product);
  }

  async search(
    props: ProductRepository.SearchParams
  ): Promise<ProductRepository.SearchResult> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;
    const { count, rows: models } = await this.productModel.findAndCountAll({
      ...(props.filter && {
        where: { name: { [Op.like]: `%${props.filter}%` } },
      }),
      ...(props.sort && this.sortableFields.includes(props.sort)
        ? { order: [[props.sort, props.sort_dir]] }
        : { order: [["created_at", "DESC"]] }),
      offset,
      limit,
    });
    return new ProductRepository.SearchResult({
      items: models.map((model) => ProductMapper.toEntity(model)),
      total: count,
      current_page: props.page,
      per_page: props.per_page,
      filter: props.filter,
      sort: props.sort,
      sort_dir: props.sort_dir,
    });
  }
}
