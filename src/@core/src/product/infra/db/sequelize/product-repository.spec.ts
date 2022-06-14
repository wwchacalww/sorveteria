import { Product } from "#product/domain";
import { NotFoundError, UniqueEntityId } from "#seedwork/domain";
import { setupSequelize } from "#seedwork/infra/testing/helper/db";
import { Sequelize } from "sequelize-typescript";
import { ProductModel } from "./product-model";
import { ProductSequelizeRepository } from "./product-repository";

describe("ProductRepository Unit Test", () => {
  setupSequelize({ models: [ProductModel] });
  let repository: ProductSequelizeRepository;
  beforeEach(async () => {
    repository = new ProductSequelizeRepository(ProductModel);
  });

  it("should insert a new product", async () => {
    let product = new Product({
      name: "Product 1",
      description: "Product 1 description",
      category: "Product 1 category",
      barcode: "123456789" as any,
      is_active: true,
    });
    await repository.insert(product);
    let model = await ProductModel.findByPk(product.id);
    expect(model.toJSON()).toStrictEqual(product.toOutput());

    product = new Product({
      name: "Product 2",
      description: "Product 2 description",
      category: "Product 2 category",
      is_active: true,
    });
    await repository.insert(product);
    model = await ProductModel.findByPk(product.id);
    expect(model.toJSON()).toStrictEqual(product.toOutput());
  });

  it("should throw error when entity not found", async () => {
    await expect(repository.findById("fake_id")).rejects.toThrow(
      new NotFoundError("Entity not found with id: fake_id")
    );
    await expect(
      repository.findById(
        new UniqueEntityId("396f4619-cdb5-471c-a129-6d874d95bb8e")
      )
    ).rejects.toThrow(
      new NotFoundError(
        "Entity not found with id: 396f4619-cdb5-471c-a129-6d874d95bb8e"
      )
    );
  });

  it("should find entity by id", async () => {
    const entity = new Product({
      name: "test",
      description: "test",
      category: "test",
    });
    await repository.insert(entity);

    let foundEntity = await repository.findById(entity.id);
    expect(foundEntity.toOutput()).toStrictEqual(entity.toOutput());
    foundEntity = await repository.findById(new UniqueEntityId(entity.id));
    expect(foundEntity.toOutput()).toStrictEqual(entity.toOutput());
  });

  it("should find all entities", async () => {
    const entity1 = new Product({
      name: "Product 1",
      description: "Product 1 description",
      category: "Product 1 category",
      barcode: "123456789" as any,
      is_active: false,
    });
    await repository.insert(entity1);
    const entity2 = new Product({
      name: "Product 2",
      description: "Product 2 description",
      category: "Product 2 category",
      barcode: "123456782" as any,
      is_active: true,
    });
    await repository.insert(entity2);
    const entities = await repository.findAll();
    expect(entities.length).toBe(2);
    expect(JSON.stringify(entities)).toBe(JSON.stringify([entity1, entity2]));
  });
});
