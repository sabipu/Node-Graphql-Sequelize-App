import { BelongsTo, Column, DataType, ForeignKey, Model, Table, HasMany } from "sequelize-typescript";
import accessEnv from "#root/helpers/accessEnv";

const tablePrefix = accessEnv("TABLE_PREFIX");

@Table({
  defaultScope: {
    attributes: { exclude: ["deletedAt"] }
  },
  paranoid: true,
  tableName: `${tablePrefix}-users`
})

export class User extends Model<User> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.UUID
  })
  id!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING
  })
  name!: string;

  @Column({
    allowNull: false,
    unique: true,
    type: DataType.STRING
  })
  email!: string;

  @Column({
    allowNull: true,
    type: DataType.CHAR(64)
  })
  hashPassword!: string;

  @HasMany(() => Site)
  sites!: Site[];
}

// @Table({
//   paranoid: false,
//   tableName: `${tablePrefix}-userSessions`
// })

// export class UserSession extends Model<UserSession> {
//   @Column({
//     allowNull: false,
//     autoIncrement: true,
//     primaryKey: true,
//     type: DataType.UUID
//   })
//   id!: string;

//   @Column({
//     allowNull: false,
//     type: DataType.STRING
//   })
//   name!: string;

//   @Column({
//     allowNull: false,
//     unique: true,
//     type: DataType.STRING
//   })
//   email!: string;

//   @Column({
//     allowNull: true,
//     type: DataType.CHAR(64)
//   })
//   hashPassword!: string;

//   @HasMany(() => Site)
//   sites!: Site[];
// }

@Table({
  defaultScope: {
    attributes: { exclude: ["deletedAt"] }
  },
  paranoid: true,
  tableName: `${tablePrefix}-sites`
})

export class Site extends Model<Site> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.UUID
  })
  id!: string;

  @Column({
    allowNull: false,
    type: DataType.INTEGER.UNSIGNED
  })
  @ForeignKey(() => User)
  userId!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  name!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  url!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  username!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  sitePassword!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  description!: string;

  @BelongsTo(() => User)
  user!: User;
}

export default [User, Site];