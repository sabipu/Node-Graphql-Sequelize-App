module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable("pre-clients", {
    id: {
      unique: true,
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    companyId: {
      allowNull: false,
      foreignKey: true,
      type: DataTypes.UUID,
      references: {
        key: "id",
        model: "pre-companies"
      }
    },
    condat_id: {
      allowNull: true,
      type: DataTypes.STRING
    },
    first_name: {
      allowNull: true,
      type: DataTypes.STRING
    },
    middle_name: {
      allowNull: true,
      type: DataTypes.STRING
    },
    last_name: {
      allowNull: true,
      type: DataTypes.STRING
    },
    email: {
      allowNull: true,
      type: DataTypes.STRING
    },
    phone: {
      allowNull: true,
      type: DataTypes.STRING
    },
    added_by: {
      allowNull: true,
      type: DataTypes.STRING
    },
    assigned_to: {
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

module.exports.down = queryInterface => queryInterface.dropTable("pre-clients");