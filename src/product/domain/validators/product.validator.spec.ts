import ProductValidatorFactory, {
  ProductRules,
  ProductValidator,
} from "./product.validator";
describe("ProductValidator tests", () => {
  let validator: ProductValidator;
  beforeEach(() => (validator = ProductValidatorFactory.create()));

  test("invalidation cases for name", () => {
    const arrange = [
      {
        value: null as any,
        expect: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 50 characters",
        ],
      },
      { value: { name: "" }, expect: ["name should not be empty"] },
      {
        value: { name: 5 as any },
        expect: [
          "name must be a string",
          "name must be shorter than or equal to 50 characters",
        ],
      },
      {
        value: { name: "t".repeat(256) },
        expect: ["name must be shorter than or equal to 50 characters"],
      },
    ];
    arrange.forEach((item) => {
      expect({ validator, data: item.value }).containsErrorMessages({
        name: item.expect as any,
      });
    });
  });

  test("invalidation cases for description", () => {
    const arrange = [
      {
        value: null as any,
        expect: [
          "description should not be empty",
          "description must be a string",
          "description must be shorter than or equal to 150 characters",
        ],
      },
      {
        value: { description: "" },
        expect: ["description should not be empty"],
      },
      {
        value: { description: 5 as any },
        expect: [
          "description must be a string",
          "description must be shorter than or equal to 150 characters",
        ],
      },
      {
        value: { description: "t".repeat(256) },
        expect: ["description must be shorter than or equal to 150 characters"],
      },
    ];
    arrange.forEach((item) => {
      expect({ validator, data: item.value }).containsErrorMessages({
        description: item.expect as any,
      });
    });
  });

  test("invalidation cases for category", () => {
    const arrange = [
      {
        value: null as any,
        expect: [
          "category should not be empty",
          "category must be a string",
          "category must be shorter than or equal to 30 characters",
        ],
      },
      {
        value: { category: "" },
        expect: ["category should not be empty"],
      },
      {
        value: { category: 5 as any },
        expect: [
          "category must be a string",
          "category must be shorter than or equal to 30 characters",
        ],
      },
      {
        value: { category: "t".repeat(256) },
        expect: ["category must be shorter than or equal to 30 characters"],
      },
    ];
    arrange.forEach((item) => {
      expect({ validator, data: item.value }).containsErrorMessages({
        category: item.expect as any,
      });
    });
  });

  test("invalidation cases for is_active", () => {
    expect({ validator, data: { is_active: 5 } }).containsErrorMessages({
      is_active: ["is_active must be a boolean value"],
    });

    expect({ validator, data: { is_active: 0 } }).containsErrorMessages({
      is_active: ["is_active must be a boolean value"],
    });

    expect({ validator, data: { is_active: 1 } }).containsErrorMessages({
      is_active: ["is_active must be a boolean value"],
    });
  });

  test("valid cases for name", () => {
    const arrange = [
      {
        props: {
          name: "some value",
          category: "popsicle",
          description: "some value",
          is_active: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
      },
      {
        props: {
          name: "some value",
          category: "popsicle",
          description: "some value",
          is_active: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      },
      {
        props: {
          name: "some value",
          category: "popsicle",
          description: "some value",
          is_active: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
      },
      {
        props: {
          name: "some value",
          category: "popsicle",
          description: "some value",
          is_active: undefined,
          created_at: new Date(),
          updated_at: new Date(),
        },
      },
      {
        props: {
          name: "some value",
          category: "popsicle",
          description: "some value",
          is_active: false,
          created_at: new Date(2022, 3, 22),
          updated_at: new Date(),
        },
      },
      {
        props: {
          name: "some value",
          category: "popsicle",
          description: "some value",
          is_active: false,
          created_at: null,
          updated_at: new Date(),
        },
      },
      {
        props: {
          name: "some value",
          category: "popsicle",
          description: "some value",
          is_active: false,
          created_at: undefined,
          updated_at: new Date(),
        },
      },
      {
        props: {
          name: "some value",
          category: "popsicle",
          description: "some value",
          is_active: false,
          created_at: new Date(),
          updated_at: new Date(2022, 5, 12),
        },
      },
      {
        props: {
          name: "some value",
          category: "popsicle",
          description: "some value",
          is_active: false,
          created_at: new Date(),
          updated_at: null,
        },
      },
      {
        props: {
          name: "some value",
          category: "popsicle",
          description: "some value",
          is_active: false,
          created_at: new Date(),
          updated_at: undefined,
        },
      },
    ];
    arrange.forEach((item) => {
      const isValid = validator.validate(item.props);
      expect(isValid).toBeTruthy();
      expect(validator.errors).toBeNull();
      expect(validator.validatedData).toStrictEqual(
        new ProductRules(item.props)
      );
    });
  });
});
