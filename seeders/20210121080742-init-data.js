const faker = require('faker');

module.exports = {
  up: async (queryInterface) => {
    const billsList = [];

    for (let i = 0; i < 4; i += 1)
    {
      billsList.push({
        total: faker.commerce.price(),
        name: faker.company.companyName(),
        created_at: new Date(),
        updated_at: new Date(),
      });
    }

    try {
      const billsCreated = await queryInterface.bulkInsert('bills', billsList, { returning: true });
      const peopleList = [];

      for (let i = 0; i < billsCreated.length; i += 1) {
        const bill = billsCreated[i];
        // Find random number of people to split the bill
        const numOfPersons = Math.floor(Math.random() * 4) + 1;

        for (let n = 0; n < numOfPersons; n += 1) {
          peopleList.push({
            bill_id: bill.id,
            name: faker.name.firstName(),
            amount: (bill.total / numOfPersons),
            created_at: new Date(),
            updated_at: new Date(),
          });
        }
      }

      await queryInterface.bulkInsert('people', peopleList);
    } catch (error) {
      console.log(error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('people', null, {});
    await queryInterface.bulkDelete('bills', null, {});
  },
};
