import { resolve } from 'path';
import db from './models/index.mjs';
import billsController from './controllers/bills.mjs';

export default function routes(app) {
  // special JS page. Include the webpack index.html file
  app.get('/home', (request, response) => {
    response.sendFile(resolve('dist', 'main.html'));
  });

  const BillsController = billsController(db);
  app.post('/createBill', BillsController.createBill);
}
