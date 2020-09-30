module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable("pre-institutes", {
    id: {
      unique: true,
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    companyId: {
      allowNull: false,
      references: {
        key: "id",
        model: "pre-companies"
      },
      type: DataTypes.UUID
    },
    institute_name: {
      allowNull: true,
      type: DataTypes.STRING
    },
    institute_code: {
      allowNull: true,
      type: DataTypes.STRING
    },
    institute_email: {
      allowNull: true,
      type: DataTypes.STRING
    },
    institute_phone: {
      allowNull: true,
      type: DataTypes.STRING
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

module.exports.down = queryInterface => queryInterface.dropTable("pre-institutes");