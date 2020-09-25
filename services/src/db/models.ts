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
    allowNull: true,
    type: DataType.STRING
  })
  first_name!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  last_name!: string;

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

@Table({
  paranoid: false,
  tableName: `${tablePrefix}-userSessions`,
  updatedAt: false
})

export class UserSession extends Model<UserSession> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.UUID
  })
  id!: string;

  @Column({
    allowNull: false,
    type: DataType.UUID
  })
  @ForeignKey(() => User)
  userId!: string;

  @Column({
    allowNull: false,
    type: DataType.DATE
  })
  expiresAt!: string;

  @BelongsTo(() => User)
  user!: User;
}

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
    type: DataType.UUID
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

@Table({
  defaultScope: {
    attributes: { exclude: ["deletedAt"] }
  },
  paranoid: true,
  tableName: `${tablePrefix}-companies`
})

export class Company extends Model<Company> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.UUID
  })
  id!: string;

  @Column({
    allowNull: false,
    type: DataType.UUID
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
  description!: string;

  @BelongsTo(() => User)
  user!: User;

  @HasMany(() => Client)
  client!: Client[];

  @HasMany(() => University)
  university!: University[];
}

@Table({
  defaultScope: {
    attributes: { exclude: ["deletedAt"] }
  },
  paranoid: true,
  tableName: `${tablePrefix}-clients`
})

export class Client extends Model<Client> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.UUID
  })
  id!: string;

  @Column({
    allowNull: false,
    type: DataType.UUID
  })
  @ForeignKey(() => Company)
  companyId!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  first_name!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  middle_name!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  last_name!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  email!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  phone!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  contact_type!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  description!: string;

  @BelongsTo(() => Company)
  company!: Company;
}

@Table({
  defaultScope: {
    attributes: { exclude: ["deletedAt"] }
  },
  paranoid: true,
  tableName: `${tablePrefix}-universities`
})

export class University extends Model<University> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.UUID
  })
  id!: string;

  @Column({
    allowNull: false,
    type: DataType.UUID
  })
  @ForeignKey(() => Company)
  companyId!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  name!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  email!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  phone!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  description!: string;

  @BelongsTo(() => Company)
  company!: Company;
}

@Table({
  defaultScope: {
    attributes: { exclude: ["deletedAt"] }
  },
  paranoid: true,
  tableName: `${tablePrefix}-courses`
})

export class Course extends Model<Course> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.UUID
  })
  id!: string;

  @Column({
    allowNull: false,
    type: DataType.UUID
  })
  @ForeignKey(() => University)
  universityId!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  name!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  duration!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  processing_time!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  bonus_amount!: string;

  @BelongsTo(() => University)
  university!: University;
}

@Table({
  defaultScope: {
    attributes: { exclude: ["deletedAt"] }
  },
  paranoid: true,
  tableName: `${tablePrefix}-enrollments`
})

export class Enrollment extends Model<Enrollment> {
  @Column({
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataType.UUID
  })
  id!: string;

  @Column({
    allowNull: false,
    type: DataType.UUID
  })
  @ForeignKey(() => Client)
  clientId!: string;

  @Column({
    allowNull: false,
    type: DataType.UUID
  })
  @ForeignKey(() => Client)
  courseId!: string;
  
  @Column({
    allowNull: false,
    type: DataType.UUID
  })
  @ForeignKey(() => Client)
  unversityId!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  course_name!: string;

  @Column({
    allowNull: true,
    type: DataType.ENUM
  })
  course_category!: string;

  @Column({
    allowNull: true,
    type: DataType.DATE
  })
  course_start_date!: string;

  @Column({
    allowNull: true,
    type: DataType.DATE
  })
  application_submission_date!: string;

  @Column({
    allowNull: true,
    type: DataType.DATE
  })
  offer_letter_date!: string;

  @Column({
    allowNull: true,
    type: DataType.DATE
  })
  offer_accpetance_date!: string;

  @Column({
    allowNull: true,
    type: DataType.DATE
  })
  gte_assessment_date!: string;

  @Column({
    allowNull: true,
    type: DataType.DATE
  })
  ecoe_date!: string;

  @Column({
    allowNull: true,
    type: DataType.DATE
  })
  actual_ecoe_received_date!: string;

  @Column({
    allowNull: true,
    type: DataType.DATE
  })
  visa_application_lodge_date!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  processing_time!: string;

  @Column({
    allowNull: true,
    type: DataType.STRING
  })
  bonus_amount!: string;

  @BelongsTo(() => University)
  university!: University;
}

export default [User, UserSession, Site, Client, Company, University, Course, Enrollment];