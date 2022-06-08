import UpdateProductUseCase from "../update-product.use-case";
import ProductInMemoryRepository from "../../../infra/repository/product-in-memory.repository";
import NotFoundError from "../../../../@seedwork/domain/errors/not-found.error";
import { Product } from "../../../domain/entities/product";

describe("UpdateProductUseCase Unit Test", () => {
  let repository: ProductInMemoryRepository;
  let useCase: UpdateProductUseCase;

  beforeEach(() => {
    repository = new ProductInMemoryRepository();
    useCase = new UpdateProductUseCase(repository);
  });

  it("should throw error if product not found", async () => {
    expect(
      useCase.execute({
        id: "not-found",
        name: "Product Test",
        description: "Product Description Test",
      })
    ).rejects.toThrow(new NotFoundError("Entity not found with id: not-found"));
  });

  it("should update a product", async () => {
    const spyUpdate = jest.spyOn(repository, "update");
    const entity = new Product({
      name: "Product 1",
      category: "picolé",
      description: "Product Description 1",
    });
    repository.items = [entity];

    let output = await useCase.execute({
      id: entity.id,
      name: "test",
      description: "Product Description 1",
    });
    expect(spyUpdate).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: entity.id,
      name: "test",
      description: "Product Description 1",
      category: "picolé",
      barcode: null,
      is_active: true,
      created_at: entity.createdAt,
      updated_at: entity.updatedAt,
    });

    type Arrange = {
      input: {
        id: string;
        name: string;
        description: string;
        barcode?: string | null;
        is_active?: boolean;
      };
      expected: {
        id: string;
        name: string;
        category: string;
        description: string;
        barcode?: string | null;
        is_active: boolean;
        created_at: Date;
        updated_at: Date;
      };
    };
    const arrange: Arrange[] = [
      {
        input: {
          id: entity.id,
          name: "test",
          description: "some description",
        },
        expected: {
          id: entity.id,
          name: "test",
          category: "picolé",
          description: "some description",
          barcode: null,
          is_active: true,
          created_at: entity.createdAt,
          updated_at: entity.updatedAt,
        },
      },
      {
        input: {
          id: entity.id,
          name: "test",
          description: "description",
          barcode: "123456789",
        },
        expected: {
          id: entity.id,
          name: "test",
          category: "picolé",
          description: "description",
          barcode: "123456789",
          is_active: true,
          created_at: entity.createdAt,
          updated_at: entity.updatedAt,
        },
      },
      {
        input: {
          id: entity.id,
          name: "test",
          description: "description",
          is_active: false,
        },
        expected: {
          id: entity.id,
          name: "test",
          category: "picolé",
          description: "description",
          barcode: "123456789",
          is_active: false,
          created_at: entity.createdAt,
          updated_at: entity.updatedAt,
        },
      },
    ];

    for (const i of arrange) {
      output = await useCase.execute({
        id: i.input.id,
        name: i.input.name,
        barcode: i.input.barcode,
        description: i.input.description,
        is_active: i.input.is_active,
      });
      expect(output).toStrictEqual({
        id: entity.id,
        name: i.expected.name,
        category: i.expected.category,
        description: i.expected.description,
        barcode: i.expected.barcode,
        is_active: i.expected.is_active,
        created_at: i.expected.created_at,
        updated_at: i.expected.updated_at,
      });
    }
  });
});
