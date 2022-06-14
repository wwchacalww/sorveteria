import { setupSequelize } from "#seedwork/infra/testing/helper/db";
import { DataType } from "sequelize-typescript";
import { ProductModel } from "./product-model";

describe("ProductModel Unit Test", () => {
  setupSequelize({ models: [ProductModel] });

  test("Attributes Properties", () => {
    const attributesMap = ProductModel.getAttributes();
    const attributes = Object.keys(attributesMap);
    expect(attributes).toEqual([
      "id",
      "name",
      "description",
      "category",
      "barcode",
      "is_active",
      "created_at",
      "updated_at",
    ]);

    const idAttr = attributesMap.id;
    expect(idAttr).toMatchObject({
      field: "id",
      fieldName: "id",
      primaryKey: true,
      type: DataType.UUIDV4(),
    });

    const nameAttr = attributesMap.name;
    expect(nameAttr).toMatchObject({
      field: "name",
      fieldName: "name",
      allowNull: false,
      type: DataType.STRING(50),
    });

    const categoryAttr = attributesMap.category;
    expect(categoryAttr).toMatchObject({
      field: "category",
      fieldName: "category",
      allowNull: false,
      type: DataType.STRING(30),
    });

    const descriptionAttr = attributesMap.description;
    expect(descriptionAttr).toMatchObject({
      field: "description",
      fieldName: "description",
      allowNull: false,
      type: DataType.STRING(150),
    });

    const barcodeAttr = attributesMap.barcode;
    expect(barcodeAttr).toMatchObject({
      field: "barcode",
      fieldName: "barcode",
      allowNull: true,
      type: DataType.STRING(31),
    });

    const is_activeAttr = attributesMap.is_active;
    expect(is_activeAttr).toMatchObject({
      field: "is_active",
      fieldName: "is_active",
      allowNull: false,
      type: DataType.BOOLEAN(),
    });

    const created_atAttr = attributesMap.created_at;
    expect(created_atAttr).toMatchObject({
      field: "created_at",
      fieldName: "created_at",
      allowNull: false,
      type: DataType.DATE(),
    });

    const updated_atAttr = attributesMap.updated_at;
    expect(updated_atAttr).toMatchObject({
      field: "updated_at",
      fieldName: "updated_at",
      allowNull: false,
      type: DataType.DATE(),
    });
  });

  test("create", async () => {
    const id = "f0a8f8a7-e8e2-4f7f-b8f8-f8a7e8e24f7f";
    const arrange = {
      id,
      name: "Product 1",
      description: "Product 1 description",
      category: "Category 1",
      barcode: "123456789",
      is_active: true,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const product = await ProductModel.create(arrange);
    expect(product.toJSON()).toStrictEqual(arrange);
  });

  // test("factory", async () => {
  //   await ProductModel.factory().create();
  //   console.log(await ProductModel.findAll());
  // });
});
