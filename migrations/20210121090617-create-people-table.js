module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('people',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        amount: {
          type: Sequelize.DECIMAL(10, 2),
        },
        name: {
          type: Sequelize.STRING,
        },
        bill_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'bills',
            key: 'id',
          },
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
    await queryInterface.dropTable('people');
  },
};
