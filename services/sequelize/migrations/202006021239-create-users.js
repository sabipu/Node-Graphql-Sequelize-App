module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable("pre-users", {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING
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