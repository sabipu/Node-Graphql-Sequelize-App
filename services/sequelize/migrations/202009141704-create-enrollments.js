module.exports.up = (queryInterface, DataTypes) => {
    return queryInterface.createTable("pre-enrollments", {
      id: {
        unique: true,
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID
      },
      clientId: {
        allowNull: false,
        references: {
          key: "id",
          model: "pre-clients"
        },
        type: DataTypes.UUID
      },
      courseId: {
        allowNull: false,
        references: {
          key: "id",
          model: "pre-courses"
        },
        type: DataTypes.UUID
      },
      course_name: {
        type: DataTypes.STRING
      },
      course_category: {
        type: DataTypes.ENUM,
        values: ["onshore", "offshore"]
      },
      course_start_date: {
        type: DataTypes.DATEONLY
      },
      application_submission_date: {
        type: DataTypes.DATEONLY
      },
      offer_letter_date: {
        type: DataTypes.DATEONLY
      },
      offer_accpetance_date: {
        type: DataTypes.DATEONLY
      },
      gte_assessment_date: {
        type: DataTypes.DATEONLY
      },
      ecoe_date: {
        type: DataTypes.DATEONLY
      },
      actual_ecoe_received_date: {
        type: DataTypes.DATEONLY
      },
      visa_application_lodge_date: {
        type: DataTypes.DATEONLY
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
  
  module.exports.down = queryInterface => queryInterface.dropTable("pre-enrollments");