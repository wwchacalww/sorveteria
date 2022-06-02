import Entity from "../entity/entity";
import NotFoundError from "../errors/not-found.error";
import uniqueEntityIdVo from "../value-objects/unique-entity-id.vo";
import {
  RepositoryInterface,
  SearchableRepositoryInterface,
} from "./repository-contracts";

export abstract class InMemoryRepositoy<E extends Entity>
  implements RepositoryInterface<E>
{
  items: E[] = [];
  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }

  async findById(id: string | uniqueEntityIdVo): Promise<E> {
    return this._get(`${id}`);
  }

  async findAll(): Promise<E[]> {
    return this.items;
  }

  async update(entity: E): Promise<void> {
    const index = this.items.findIndex((i) => i.id === entity.id);
    if (index === -1) {
      throw new NotFoundError(`Entity not found`);
    }
    this.items[index] = entity;
  }

  async delete(id: string | uniqueEntityIdVo): Promise<void> {
    const _id = `${id}`;
    const index = this.items.findIndex((i) => i.id === _id);
    if (index === -1) {
      throw new NotFoundError(`Entity not found`);
    }
    this.items.splice(index, 1);
  }

  protected async _get(id: string): Promise<E> {
    const item = this.items.find((i) => i.id === id);
    if (!item) {
      throw new NotFoundError(`Entity not found with id: ${id}`);
    }
    return item;
  }
}

export abstract class InMemorySearchableRepository<E extends Entity>
  extends InMemoryRepositoy<E>
  implements SearchableRepositoryInterface<E, any, any>
{
  search(props: any): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
