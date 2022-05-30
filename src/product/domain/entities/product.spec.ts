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

  test("ID of product", () => {
    let props: ProductProps = {
      name: "test",
      description: "test description",
      category: "picole",
    };

    let product = new Product(props);
    expect(product.id).not.toBeNull();
    product = new Product(props, null);
    expect(product.id).not.toBeNull();
    product = new Product(props, undefined);
    expect(product.id).not.toBeNull();
    product = new Product(props, "d9ed5524-7b17-42ec-88e2-77522be4c073" as any);
    expect(product.id).not.toBeNull();
  });
  test("getters of product", () => {
    let props: ProductProps = {
      name: "test",
      description: "test description",
      category: "picole",
    };

    let product = new Product(props);

    expect(product.name).toBe("test");
    expect(product.description).toBe("test description");
    expect(product.category).toBe("picole");
    expect(product.barcode).toBe("");
    expect(product.isActive).toBe(true);
    expect(product.createdAt).toBeInstanceOf(Date);
    expect(product.updatedAt).toBeInstanceOf(Date);
  });

  test("setters of product", () => {
    let props: ProductProps = {
      name: "test",
      description: "test description",
      category: "picole",
    };

    let product = new Product(props);

    product["name"] = "test2";
    expect(product.name).toBe("test2");
    product["description"] = "test description2";
    expect(product.description).toBe("test description2");
    product["category"] = "picole2";
    expect(product.category).toBe("picole2");
    product["barcode"] = "123456789";
    expect(product.barcode).toBe("123456789");
    product["isActive"] = false;
    expect(product.isActive).toBe(false);
    product["updatedAt"] = new Date();
    expect(product.updatedAt).toBeInstanceOf(Date);
  });
});
