import bodyParser from 'body-parser';
import { RegisterRoutes } from './routes/routes';
import express, {
  Response as ExResponse,
  Request as ExRequest,
  NextFunction,
} from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import { ValidateError } from 'tsoa';
import { Error } from 'mongoose';
import cookieParser from 'cookie-parser';

export const app = express();

// Use body parser to read sent json payloads
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(
  cors({
    credentials: true,
  })
);
app.use(cookieParser('secret'));
app.use('/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(
    swaggerUi.generateHTML(await import('../../swagger/swagger.json'))
  );
});

RegisterRoutes(app);

app.use(function errorHandler(
  err: Error,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction
): ExResponse | void {
  if (err instanceof ValidateError) {
    console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
    return res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields,
    });
  }

  next(err);
});

// @ts-ignore
app.use(function errorResponder(error: express.Error, req, res, next) {
  // responding to client
  // Error handling middleware functionality
  console.log(`error : ${error.message}`); // log the error
  const status = error.status || 400;
  // send back an easily understandable error message to the caller
  res.status(status).send({ body: error.message });
});

// @ts-ignore
app.use(function failSafeHandler(error, req, res, next) {
  // generic handler
  res.status(500).send(error);
});
