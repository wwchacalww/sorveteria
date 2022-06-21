import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { SequelizeModelFactory } from "./sequelize-model-factory";
import Chance from "chance";
import { validate as uuidValidate } from "uuid";
import { setupSequelize } from "../testing/helper/db";

const chance = Chance();
@Table({ tableName: "stubs", timestamps: false })
class Stub extends Model {
  @PrimaryKey
  @Column({ type: DataType.UUIDV4 })
  declare id: string;

  @Column({ allowNull: false, type: DataType.STRING(50) })
  declare name: string;

  static mockFactory = jest.fn(() => ({
    id: chance.guid({ version: 4 }),
    name: chance.word(),
  }));
  static factory() {
    return new SequelizeModelFactory(Stub, Stub.mockFactory);
  }
}

describe("SequelizeModelFactory Unit Tests", () => {
  setupSequelize({ models: [Stub] });

  test("create method", async () => {
    let model = await Stub.factory().create();
    expect(uuidValidate(model.id)).toBeTruthy();
    expect(model.name).not.toBeNull();
    expect(model.id).not.toBeNull();
    expect(Stub.mockFactory).toHaveBeenCalled();
    let modelFound = await Stub.findByPk(model.id);
    expect(modelFound.id).toEqual(model.id);

    model = await Stub.factory().create({
      id: "f0a8f8a7-e8e2-4f7f-b8f8-f8a7e8e24f7f",
      name: "Movie",
    });
    expect(model.id).toEqual("f0a8f8a7-e8e2-4f7f-b8f8-f8a7e8e24f7f");
    expect(model.name).toEqual("Movie");
    expect(Stub.mockFactory).toHaveBeenCalledTimes(1);
    modelFound = await Stub.findByPk(model.id);
    expect(modelFound.id).toEqual(model.id);
  });

  test("make method", () => {
    let model = Stub.factory().make();
    expect(uuidValidate(model.id)).toBeTruthy();
    expect(model.name).not.toBeNull();
    expect(model.id).not.toBeNull();
    expect(Stub.mockFactory).toHaveBeenCalled();

    model = Stub.factory().make({
      id: "f0a8f8a7-e8e2-4f7f-b8f8-f8a7e8e24f7f",
      name: "Movie",
    });

    expect(model.id).toBe("f0a8f8a7-e8e2-4f7f-b8f8-f8a7e8e24f7f");
    expect(model.name).toBe("Movie");
    expect(Stub.mockFactory).toHaveBeenCalledTimes(1);
  });

  test("bulckCreate method using count = 1", async () => {
    let models = await Stub.factory().bulkCreate();
    expect(models).toHaveLength(1);
    expect(models[0].name).not.toBeNull();
    expect(models[0].id).not.toBeNull();
    expect(Stub.mockFactory).toHaveBeenCalled();
    let modelFound = await Stub.findByPk(models[0].id);
    expect(modelFound.id).toEqual(models[0].id);
    expect(modelFound.name).toEqual(models[0].name);

    models = await Stub.factory().bulkCreate(() => ({
      id: "f0a8f8a7-e8e2-4f7f-b8f8-f8a7e8e24f7f",
      name: "Movie",
    }));
    expect(models[0].id).toEqual("f0a8f8a7-e8e2-4f7f-b8f8-f8a7e8e24f7f");
    expect(models[0].name).toEqual("Movie");
    expect(Stub.mockFactory).toHaveBeenCalledTimes(1);
    modelFound = await Stub.findByPk(models[0].id);
    expect(modelFound.id).toEqual(models[0].id);
  });

  test("bulckCreate method using count > 1", async () => {
    let models = await Stub.factory().count(2).bulkCreate();
    expect(models).toHaveLength(2);
    expect(models[0].name).not.toBeNull();
    expect(models[0].id).not.toBeNull();
    expect(models[1].name).not.toBeNull();
    expect(models[1].id).not.toBeNull();
    expect(Stub.mockFactory).toHaveBeenCalledTimes(2);

    let modelFound1 = await Stub.findByPk(models[0].id);
    expect(modelFound1.id).toEqual(models[0].id);
    expect(modelFound1.name).toEqual(models[0].name);
    let modelFound2 = await Stub.findByPk(models[1].id);
    expect(modelFound2.id).toEqual(models[1].id);
    expect(modelFound2.name).toEqual(models[1].name);

    models = await Stub.factory()
      .count(2)
      .bulkCreate(() => ({
        id: chance.guid({ version: 4 }),
        name: "Movie",
      }));
    expect(models[0].id).not.toEqual(models[1].id);
    expect(models[0].name).toEqual("Movie");
    expect(Stub.mockFactory).toHaveBeenCalledTimes(2);
  });
});
