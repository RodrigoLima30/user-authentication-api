import express from 'express';
import { router } from './infra/routes/route.js';
import { errorHandler } from './infra/middlewares/error-handler.js';

const app = express();

app.use(express.json());

app.use("/", router);

app.use(errorHandler);

app.listen(3333, () => { console.log('Server runninhg on port 3333');});


