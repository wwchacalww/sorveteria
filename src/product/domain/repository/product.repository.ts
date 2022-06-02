import { RepositoryInterface } from "../../../@seedwork/domain/repository/repository-contracts";
import { Product } from "../entities/product";

export default interface ProductRepository
  extends RepositoryInterface<Product> {}
