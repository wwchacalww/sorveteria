import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { SequelizeModelFactory } from "#seedwork/infra/sequelize/sequelize-model-factory";
import Chance from "chance";

type ProductModelProperties = {
  id: string;
  name: string;
  description: string;
  category: string;
  barcode: string | null;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
};

@Table({ tableName: "products", timestamps: false })
export class ProductModel extends Model<ProductModelProperties> {
  @PrimaryKey
  @Column({ type: DataType.UUIDV4 })
  id: string;

  @Column({ allowNull: false, type: DataType.STRING(50) })
  name: string;

  @Column({ allowNull: false, type: DataType.STRING(150) })
  description: string;

  @Column({ allowNull: false, type: DataType.STRING(30) })
  category: string;

  @Column({ allowNull: true, type: DataType.STRING(31) })
  barcode: string | null;

  @Column({ allowNull: false, type: DataType.BOOLEAN() })
  is_active: boolean;

  @Column({ allowNull: false, type: DataType.DATE() })
  created_at: Date;

  @Column({ allowNull: false, type: DataType.DATE() })
  updated_at: Date;

  static factory() {
    const chance: Chance.Chance = require("chance")();
    return new SequelizeModelFactory(ProductModel, () => ({
      id: chance.guid({ version: 4 }),
      name: chance.word(),
      description: chance.sentence(),
      category: chance.word(),
      barcode: chance.zip(),
      is_active: chance.bool(),
      created_at: chance.date(),
      updated_at: chance.date(),
    }));
  }
}
