module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable("pre-sites", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER.UNSIGNED
    },
    userId: {
      allowNull: false,
      references: {
        key: "id",
        model: "pre-users"
      },
      type: DataTypes.INTEGER.UNSIGNED
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING
    },
    url: {
      allowNull: true,
      type: DataTypes.STRING
    },
    username: {
      allowNull: true,
      type: DataTypes.STRING
    },
    sitePassword: {
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

module.exports.down = queryInterface => queryInterface.dropTable("pre-sites");