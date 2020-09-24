module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable("pre-courses", {
    id: {
      unique: true,
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    universityId: {
      allowNull: false,
      references: {
        key: "id",
        model: "pre-universities"
      },
      type: DataTypes.UUID
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING
    },
    duration: {
      allowNull: true,
      type: DataTypes.STRING
    },
    processing_time: {
      allowNull: true,
      type: DataTypes.STRING
    },
    bonus_amount: {
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

module.exports.down = queryInterface => queryInterface.dropTable("pre-courses");