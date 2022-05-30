import { Product, ProductProps } from "./product";
describe("Product Unit Test", () => {
  test("construct of product", () => {
    let props: ProductProps = {
      name: "test",
      description: "test description",
      category: "picole",
    };

    let product = new Product(props);

    expect(product.props.created_at).toBeInstanceOf(Date);
    props.created_at = new Date();
    props.updated_at = new Date();
    product = new Product(props);
    expect(product.props).toStrictEqual({
      name: "test",
      description: "test description",
      category: "picole",
      barcode: "",
      is_active: true,
      created_at: props.created_at,
      updated_at: props.updated_at,
    });
    props.is_active = false;
    props.barcode = "123456789";
    product = new Product(props);
    expect(product.props).toStrictEqual({
      name: "test",
      description: "test description",
      category: "picole",
      barcode: "123456789",
      is_active: false,
      created_at: props.created_at,
      updated_at: props.updated_at,
    });
  });
});
