import { resolve } from 'path';
import db from './models/index.mjs';
import billsController from './controllers/bills.mjs';
import peopleController from './controllers/people.mjs';

export default function routes(app) {
  // special JS page. Include the webpack index.html file
  app.get('/home', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });

  const BillsController = billsController(db);
  app.post('/createBill', BillsController.createBill);
  app.post('/setTotal', BillsController.setTotal);

  const PeopleController = peopleController(db);
  app.post('/addPerson', PeopleController.createPersonData);
}
