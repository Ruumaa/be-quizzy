import { config } from 'dotenv';
config();
import express, { Application } from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import { router } from './routes/routes';

const app: Application = express();
const PORT: number | string = process.env.PORT || 5000;

app.use(cors());

//middleware handle JSON request
app.use(express.json());

app.use('/', router);

//middleware error handler
app.use(errorHandler);

// Routes
app.listen(PORT, () => {
  console.log(`Server runnning on Port ${PORT}`);
});
