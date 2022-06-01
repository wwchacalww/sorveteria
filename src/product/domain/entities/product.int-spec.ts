import ValidationError from "../../../@seedwork/domain/errors/validation.error";
import Barcode from "../../../@seedwork/domain/value-objects/barcode.vo";
import { Product } from "./product";

describe("Product Integration Test", () => {
  describe("Create method", () => {
    it("should throw an error when create an invalid product", async () => {
      const arrange = [
        {
          name: "",
          description: "test description",
          category: "picole",
          error: { name: ["name should not be empty"] },
        },
        {
          name: null,
          description: "test description",
          category: "picole",
          error: {
            name: [
              "name should not be empty",
              "name must be a string",
              "name must be shorter than or equal to 50 characters",
            ],
          },
        },
        {
          name: undefined,
          description: "test description",
          category: "picole",
          error: {
            name: [
              "name should not be empty",
              "name must be a string",
              "name must be shorter than or equal to 50 characters",
            ],
          },
        },
        {
          name: 5,
          description: "test description",
          category: "picole",
          error: {
            name: [
              "name must be a string",
              "name must be shorter than or equal to 50 characters",
            ],
          },
        },
        {
          name: true,
          description: "test description",
          category: "picole",
          error: {
            name: [
              "name must be a string",
              "name must be shorter than or equal to 50 characters",
            ],
          },
        },
        {
          name: { prop: "test" },
          description: "test description",
          category: "picole",
          error: {
            name: [
              "name must be a string",
              "name must be shorter than or equal to 50 characters",
            ],
          },
        },
        {
          name: "t".repeat(51),
          description: "test description",
          category: "picole",
          error: {
            name: ["name must be shorter than or equal to 50 characters"],
          },
        },
        {
          name: "test",
          description: "",
          category: "picole",
          error: { description: ["description should not be empty"] },
        },
        {
          name: "test",
          description: null,
          category: "picole",
          error: {
            description: [
              "description should not be empty",
              "description must be a string",
              "description must be shorter than or equal to 150 characters",
            ],
          },
        },
        {
          name: "test",
          description: undefined,
          category: "picole",
          error: {
            description: [
              "description should not be empty",
              "description must be a string",
              "description must be shorter than or equal to 150 characters",
            ],
          },
        },
        {
          name: "test",
          description: "test description",
          category: "",
          error: {
            category: ["category should not be empty"],
          },
        },
        {
          name: "test",
          description: "test description",
          category: null as any,
          error: {
            category: [
              "category should not be empty",
              "category must be a string",
              "category must be shorter than or equal to 30 characters",
            ],
          },
        },
        {
          name: "test",
          description: "test description",
          category: undefined,
          error: {
            category: [
              "category should not be empty",
              "category must be a string",
              "category must be shorter than or equal to 30 characters",
            ],
          },
        },
        {
          name: "test",
          description: "test description",
          category: "popsicle",
          is_active: "true",
          error: { is_active: ["is_active must be a boolean value"] },
        },
        {
          name: "test",
          description: "test description",
          category: "popsicle",
          is_active: 0,
          error: { is_active: ["is_active must be a boolean value"] },
        },
      ];

      arrange.forEach((value) => {
        expect(
          () =>
            new Product({
              name: value.name as any,
              description: value.description,
              category: value.category,
              is_active: value.is_active ?? (null as any),
            })
        ).containsErrorMessages(value.error);
      });
    });

    it("should create a valid product", async () => {
      expect.assertions(0);
      new Product({
        name: "test",
        description: "test description",
        category: "picole",
        barcode: new Barcode("1234567890123"),
      });
    });
  });

  describe("Update method", () => {
    it("should throw an error when update an invalid product", async () => {
      const product = new Product({
        name: "test",
        description: "test description",
        category: "picole",
        barcode: new Barcode("1234567890123"),
      });
      const arrange = [{ value: null }, { value: undefined }, { value: "" }];
      arrange.forEach((item) => {
        expect(() => product.changeName(item.value)).toThrow(
          new ValidationError("The name is required")
        );
        expect(() => product.changeDescription(item.value)).toThrow(
          new ValidationError("The description is required")
        );
        expect(() => product.changeBarcode(item.value)).toThrow(
          new ValidationError("The barcode is required")
        );
      });

      const arrangeNotString = [
        { value: 5 },
        { value: true },
        { value: { prop: "test" } },
      ];
      arrangeNotString.forEach((item) => {
        expect(() => product.changeName(item.value as any)).toThrow(
          new ValidationError("The name must be a string")
        );
        expect(() => product.changeDescription(item.value as any)).toThrow(
          new ValidationError("The description must be a string")
        );
        expect(() => product.changeBarcode(item.value as any)).toThrow(
          new ValidationError("The barcode must be a string")
        );
      });

      expect(() => product.changeName("t".repeat(151))).toThrow(
        new ValidationError("The name must be less or equal than 50 characters")
      );
      expect(() => product.changeDescription("t".repeat(151))).toThrow(
        new ValidationError(
          "The description must be less or equal than 150 characters"
        )
      );
      expect(() => product.changeBarcode("t".repeat(151))).toThrow(
        new ValidationError(
          "The barcode must be less or equal than 30 characters"
        )
      );
    });

    it("should update a valid product", async () => {
      const product = new Product({
        name: "test",
        description: "test description",
        category: "picole",
        barcode: new Barcode("1234567890123"),
      });
      expect.assertions(0);
      product.changeName("test2");
      product.changeDescription("test description 2");
      product.changeBarcode("1234567 890123");
    });
  });
});
