module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable("pre-users", {
    id: {
      unique: true,
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    first_name: {
      allowNull: true,
      type: DataTypes.STRING
    },
    last_name: {
      allowNull: true,
      type: DataTypes.STRING
    },
    role: {
      type: DataTypes.ENUM,
      values: ['admin', 'staff']
    },
    team: {
      type: DataTypes.UUID
    },
    company: {
      type: DataTypes.UUID
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    hashPassword: {
      allowNull: true,
      type: DataTypes.CHAR(64)
    },
    last_login: {
      type: DataTypes.DATE
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE
    }
  }, {
    charset: "utf8"
  });
};

module.exports.down = queryInterface => queryInterface.dropTable("pre-users");