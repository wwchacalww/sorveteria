import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Sequelize,
  Table,
} from "sequelize-typescript";
import { SequelizeModelFactory } from "./sequelize-model-factory";
import Chance from "chance";
import { validate as uuidValidate } from "uuid";

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
  let sequelize: Sequelize;

  beforeAll(() => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      host: ":memory:",
      logging: false,
      models: [Stub],
    });
  });

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  test("create method", async () => {
    let model = await Stub.factory().create();
    expect(uuidValidate(model.id)).toBeTruthy();
    expect(model.name).not.toBeNull();
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
});
