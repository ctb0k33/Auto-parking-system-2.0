import express from "express";
import "./config/mongo.js";
import helmet from 'helmet';
import cors from "cors";
import morgan from 'morgan';
import parkingRouter from './routes/parkingRoute.js';
import qrRouter from './routes/qrRoute.js';
import userRouter from './routes/userRoute.js';
import {AppError} from './utils/appError.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({origin: true, credentials: true}));

if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}

app.use('/api/v1/parking',parkingRouter);
app.use('/api/v1/qr',qrRouter);
app.use('/api/v1/user',userRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.all('*', (req, res, next) => {
  const err = new AppError(
    `Can't find ${req.originalUrl} on this server!`,
    404,
  );
  next(err);
});
