
const express = require('express');
const cors = require('cors');
const connectDB = require('./configs/DB');
connectDB();
const userRouter = require('./router/userRouter');

const app = express();
const port = 8000;



/* Middlewares */
app.use(cors());

app.use(express.json()); // parsing to the body of the request from the client

app.use('/users', userRouter);

app.listen(port, () =>
  console.log(`app is listening on: http://localhost:${port}`)
);
