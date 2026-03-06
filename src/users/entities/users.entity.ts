import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare fullName: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  declare age: number | null;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare password: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare provider: 'local' | 'google';
}
