import { Product, ProductProps } from "./product";
describe("Product Unit Test", () => {
  test("construct of product", () => {
    const props: ProductProps = {
      barcode: "123456789",
      category: "picole",
      created_at: new Date(),
      description: "test description",
      is_active: true,
      name: "test",
      updated_at: new Date(),
    };

    const product = new Product(props);

    expect(product.props).toStrictEqual(props);
  });
});
