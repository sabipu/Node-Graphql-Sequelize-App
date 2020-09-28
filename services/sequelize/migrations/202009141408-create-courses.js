module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable("pre-courses", {
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
        model: "pre-institutes"
      },
      type: DataTypes.UUID
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING
    },
    university_name : {
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
    duration: {
      allowNull: true,
      type: DataTypes.STRING
    },
    application_processing_days: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    onshore_bonus_amount: {
      allowNull: true,
      type: DataTypes.INTEGER
    },
    offshore_bonus_amount: {
      allowNull: true,
      type: DataTypes.INTEGER
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

module.exports.down = queryInterface => queryInterface.dropTable("pre-courses");