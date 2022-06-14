import { Product, ProductProps } from "#product/domain";
import {
  Barcode,
  EntityValidationError,
  UniqueEntityId,
  LoadEntityError,
} from "#seedwork/domain";
import { ProductModel } from "./product-model";

export class ProductMapper {
  static toEntity(model: ProductModel): Product {
    const {
      id,
      name,
      description,
      category,
      barcode,
      is_active,
      created_at,
      updated_at,
    } = model.toJSON();
    const _barcode = barcode === "null" ? null : barcode;
    const input: ProductProps = {
      name,
      description,
      category,
      barcode: _barcode ? new Barcode(_barcode) : null,
      is_active,
      created_at,
      updated_at,
    };
    try {
      return new Product(input, new UniqueEntityId(id));
    } catch (e) {
      if (e instanceof EntityValidationError) {
        throw new LoadEntityError(e.error);
      }

      throw e;
    }
  }
}
