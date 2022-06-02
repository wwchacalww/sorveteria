import Entity from "../entity/entity";
import NotFoundError from "../errors/not-found.error";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import InMemoryRepositoy from "./in-memory.repository";

type stubProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<stubProps> {}

class StubInMemoryRepository extends InMemoryRepositoy<StubEntity> {}
describe("InMemoryRepository Unit Test", () => {
  let repository: StubInMemoryRepository;
  beforeEach(() => {
    repository = new StubInMemoryRepository();
  });

  it("should insert new entity", async () => {
    const entity = new StubEntity({ name: "test", price: 1 });
    await repository.insert(entity);
    expect(repository.items[0].toJSON).toStrictEqual(entity.toJSON);
  });

  it("should throw error when entity not found", async () => {
    expect(repository.findById("fake_id")).rejects.toThrow(
      new NotFoundError("Entity not found with id: fake_id")
    );
    expect(
      repository.findById(
        new UniqueEntityId("396f4619-cdb5-471c-a129-6d874d95bb8e")
      )
    ).rejects.toThrow(
      new NotFoundError(
        "Entity not found with id: 396f4619-cdb5-471c-a129-6d874d95bb8e"
      )
    );
  });
});
