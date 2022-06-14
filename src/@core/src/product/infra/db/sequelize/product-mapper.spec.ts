import { Product } from "#product/domain";
import { LoadEntityError, UniqueEntityId } from "#seedwork/domain";
import { Sequelize } from "sequelize-typescript";
import { ProductMapper } from "./product-mapper";
import { ProductModel } from "./product-model";

describe("ProductMapper Unit Test", () => {
  let sequelize: Sequelize;

  beforeAll(() => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      host: ":memory:",
      logging: false,
      models: [ProductModel],
    });
  });

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should throw error when category is invalid", async () => {
    const model = ProductModel.build({
      id: "396f4619-cdb5-471c-a129-6d874d95bb8e",
    });
    try {
      ProductMapper.toEntity(model);
      fail("The category is valide, but should throw a LoadEntityError");
    } catch (e) {
      expect(e).toBeInstanceOf(LoadEntityError);
      expect(e.error).toMatchObject({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 50 characters",
        ],
      });
    }
  });

  it("should be convert a model for an entity", () => {
    const created_at = new Date();

    const model = ProductModel.build({
      id: "396f4619-cdb5-471c-a129-6d874d95bb8e",
      name: "Product 1",
      description: "Product 1 description",
      category: "Product 1 category",
      barcode: "123456789",
      is_active: true,
      created_at,
      updated_at: created_at,
    });
    const entity = ProductMapper.toEntity(model);
    expect(entity.toOutput()).toStrictEqual(
      new Product(
        {
          name: "Product 1",
          description: "Product 1 description",
          category: "Product 1 category",
          barcode: "123456789" as any,
          is_active: true,
          created_at,
          updated_at: created_at,
        },
        new UniqueEntityId("396f4619-cdb5-471c-a129-6d874d95bb8e")
      ).toOutput()
    );
  });

  it("should throw a generic error", () => {
    const error = new Error("Generic error");
    const spyValidate = jest
      .spyOn(Product, "validate")
      .mockImplementation(() => {
        throw error;
      });
    const model = ProductModel.build({
      id: "396f4619-cdb5-471c-a129-6d874d95bb8e",
    });
    expect(() => ProductMapper.toEntity(model)).toThrow(error);
  });
});
