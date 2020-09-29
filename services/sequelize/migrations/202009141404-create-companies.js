module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable("pre-companies", {
    id: {
      unique: true,
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    userId: {
      allowNull: false,
      foreignKey: true,
      references: {
        key: "id",
        model: "pre-users"
      },
      type: DataTypes.UUID
    },
    company_name: {
      allowNull: true,
      type: DataTypes.STRING
    },
    company_username: {
      allowNull: true,
      type: DataTypes.STRING
    },
    description: {
      allowNull: true,
      type: DataTypes.TEXT
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

module.exports.down = queryInterface => queryInterface.dropTable("pre-companies");