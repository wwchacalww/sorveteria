import Barcode from "#seedwork/domain/value-objects/barcode.vo";
import { Product, ProductProps } from "./product";

describe("Product Unit Test", () => {
  beforeEach(() => {
    Product.validate = jest.fn();
  });
  test("construct of product", () => {
    let props: ProductProps = {
      name: "test",
      description: "test description",
      category: "picole",
    };

    let product = new Product(props);
    expect(Product.validate).toHaveBeenCalled();
    expect(product.props.created_at).toBeInstanceOf(Date);
    props.created_at = new Date();
    props.updated_at = new Date();
    product = new Product(props);
    expect(product.props).toStrictEqual({
      name: "test",
      description: "test description",
      category: "picole",
      barcode: null,
      is_active: true,
      created_at: props.created_at,
      updated_at: props.updated_at,
    });

    props.is_active = false;
    props.barcode = new Barcode("123456789");
    product = new Product(props);
    expect(product.props.name).toBe("test");
    expect(product.props.description).toBe("test description");
    expect(product.props.category).toBe("picole");
    expect(product.props.barcode.value).toBe(new Barcode("123456789").value);
    expect(product.props.is_active).toBe(false);
    expect(product.props.created_at).toBe(props.created_at);
    expect(product.props.updated_at).toBe(props.updated_at);
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
    expect(product.barcode).toBe(null);
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
    product["barcode"] = new Barcode("123456789");
    expect(product.barcode.value).toBe("123456789");
    product["isActive"] = false;
    expect(product.isActive).toBe(false);
    product["updatedAt"] = new Date();
    expect(product.updatedAt).toBeInstanceOf(Date);
  });

  test("update of product", () => {
    let props: ProductProps = {
      name: "test",
      description: "test description",
      category: "picole",
      barcode: new Barcode("123456789"),
      is_active: true,
    };

    let product = new Product(props);

    product.changeName("test2");
    expect(product.name).toBe("test2");
    product.changeDescription("test description2");
    expect(product.description).toBe("test description2");
    product.changeBarcode("1334-2342 2340aer");
    expect(product.barcode.value).toBe("1334-2342 2340aer");
    expect(product.code).toBe("1334-2342 2340aer");
    product.desactivate();
    expect(product.isActive).toBe(false);
    product.activate();
    expect(product.isActive).toBe(true);
  });
});
