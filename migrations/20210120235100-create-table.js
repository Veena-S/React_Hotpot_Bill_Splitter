module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('bills',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        total: {
          type: Sequelize.DECIMAL(10, 2),
        },
        name: {
          type: Sequelize.STRING,
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('bills');
  },
};
