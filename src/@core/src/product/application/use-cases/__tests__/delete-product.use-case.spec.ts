import NotFoundError from "#seedwork/domain/errors/not-found.error";
import { DeleteProductUseCase } from "../delete-product.use-case";
import ProductInMemoryRepository from "#product/infra/db/in-memory/product-in-memory.repository";
import { Product } from "#product/domain/entities/product";

describe("DeleteProductUseCase Unit Tests", () => {
  let useCase: DeleteProductUseCase.UseCase;
  let repository: ProductInMemoryRepository;

  beforeEach(() => {
    repository = new ProductInMemoryRepository();
    useCase = new DeleteProductUseCase.UseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(
      new NotFoundError(`Entity not found`)
    );
  });

  it("should delete a Product", async () => {
    const items = [
      new Product({
        name: "test 1",
        description: "test 1",
        category: "test 1",
      }),
    ];
    repository.items = items;
    await useCase.execute({
      id: items[0].id,
    });
    expect(repository.items).toHaveLength(0);
  });
});
