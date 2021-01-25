export default function billsController(db) {
  const index = async (request, response) => {
    try {
      const bills = await db.Bill.findAll();
      response.send({ items: bills });
    } catch (error) {
      console.log(error);
    }
  };

  const createBill = async (request, response) => {
    try {
      const newBill = await db.Bill.create(request.body);
      response.send(newBill);
    }
    catch (error) {
      response.status(500).send(error);
    }
  };

  const setTotal = async (request, response) => {
    try {
      const bill = await db.Bill.findByPk(request.body.id);
      await bill.update({ total: request.body.total });
      response.send(bill);
    }
    catch (error) {
      response.status(500).send(error);
    }
  };

  return {
    index, createBill, setTotal,
  };
}
