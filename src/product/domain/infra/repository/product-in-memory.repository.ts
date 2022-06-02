import { InMemorySearchableRepository } from "../../../../@seedwork/domain/repository/in-memory.repository";
import { Product } from "../../entities/product";
import ProductRepository from "../../repository/product.repository";

export default class ProductInMemoryRepository
  extends InMemorySearchableRepository<Product>
  implements ProductRepository {}
