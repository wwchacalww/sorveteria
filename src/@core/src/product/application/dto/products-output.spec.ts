import { Product } from "../../domain/entities/product";
import { ProductOutputMapper } from "./products-output";
describe("ProductOutputMapper Unit Test", () => {
  test("ProductOutputMapper", () => {
    let product = new Product({
      name: "Product Teste",
      description: "Descrição do produto",
      category: "Categoria do produto",
    });
    let output = ProductOutputMapper.toOutput(product);
    expect(output).toStrictEqual({
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.category,
      barcode: null,
      is_active: true,
      created_at: product.createdAt,
      updated_at: product.updatedAt,
    });

    product = new Product({
      name: "Product Teste",
      description: "Descrição do produto",
      category: "Categoria do produto",
      barcode: "123456789" as any,
      is_active: false,
    });

    output = ProductOutputMapper.toOutput(product);
    expect(output).toStrictEqual({
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.category,
      barcode: "123456789",
      is_active: false,
      created_at: product.createdAt,
      updated_at: product.updatedAt,
    });
  });
});
