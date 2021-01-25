export default function peopleController(db) {
  const index = async (request, response) => {
    try {
      const people = await db.Person.findAll();
      response.send({ people });
    } catch (error) {
      console.log(error);
    }
  };

  const createPersonData = async (request, response) => {
    try {
      const {
        billId, peopleList, personItemMap,
      } = request.body;

      const peopleUpdateQueries = [];
      peopleList.forEach((person) => {
        let totalAmount = 0;
        personItemMap[person].forEach((item) => {
          totalAmount += item.price;
        });
        const data = {
          bill_id: billId,
          name: person,
          amount: totalAmount,
        };
        peopleUpdateQueries.push(db.Person.create(data));
      });

      const resultData = await Promise.all(peopleUpdateQueries);
      response.send({ resultData });
    }
    catch (error) {
      response.status(500).send(error);
    }
  };

  return {
    index, createPersonData,
  };
}
