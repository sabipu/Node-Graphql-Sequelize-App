module.exports.up = (queryInterface, DataTypes) => {
  return queryInterface.createTable("pre-userSessions", {
    id: {
      unique: true,
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    
    userId: {
      allowNull: false,
      references: {
        key: "id",
        model: "pre-users"
      },
      type: DataTypes.UUID
    },
    token: {
      type: DataTypes.CHAR(64)
    },
    expiresAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    charset: "utf8"
  });
};

module.exports.down = queryInterface => queryInterface.dropTable("pre-userSessions");