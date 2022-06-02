import Entity from "../entity/entity";
import NotFoundError from "../errors/not-found.error";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";
import { InMemoryRepositoy } from "./in-memory.repository";

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

  it("should find entity by id", async () => {
    const entity = new StubEntity({ name: "test", price: 1 });
    await repository.insert(entity);
    let foundEntity = await repository.findById(entity.id);
    expect(foundEntity.toJSON).toStrictEqual(entity.toJSON);
    foundEntity = await repository.findById(new UniqueEntityId(entity.id));
    expect(foundEntity.toJSON).toStrictEqual(entity.toJSON);
  });

  it("should returns all entities", async () => {
    const entity1 = new StubEntity({ name: "test", price: 1 });
    const entity2 = new StubEntity({ name: "test", price: 2 });
    await repository.insert(entity1);
    await repository.insert(entity2);
    const foundEntities = await repository.findAll();
    expect(foundEntities.length).toBe(2);
    expect(foundEntities[0].toJSON).toStrictEqual(entity1.toJSON);
    expect(foundEntities[1].toJSON).toStrictEqual(entity2.toJSON);
  });

  it("should throw error when update entity not found", async () => {
    const entity = new StubEntity({ name: "test", price: 1 });
    expect(async () => await repository.update(entity)).rejects.toThrow(
      new NotFoundError(`Entity not found`)
    );
  });

  it("should update entity", async () => {
    const entity = new StubEntity({ name: "test", price: 1 });
    await repository.insert(entity);
    const updatedEntity = new StubEntity(
      { name: "test2", price: 2 },
      entity.uniqueEntityId
    );
    await repository.update(updatedEntity);
    const foundEntity = await repository.findById(entity.id);
    expect(foundEntity.toJSON).toStrictEqual(updatedEntity.toJSON);
  });

  it("should throw error when delete entity not found", async () => {
    const entity = new StubEntity({ name: "test", price: 1 });
    expect(async () => await repository.delete(entity.id)).rejects.toThrow(
      new NotFoundError(`Entity not found`)
    );
    expect(
      async () => await repository.delete(new UniqueEntityId(entity.id))
    ).rejects.toThrow(new NotFoundError(`Entity not found`));
  });

  it("should delete entity", async () => {
    const entity = new StubEntity({ name: "test", price: 1 });
    await repository.insert(entity);
    await repository.delete(entity.id);
    expect(repository.items).toHaveLength(0);
    await repository.insert(entity);
    await repository.delete(new UniqueEntityId(entity.id));
    expect(repository.items).toHaveLength(0);
  });
});
