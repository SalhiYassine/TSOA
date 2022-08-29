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

  return res.status(500).json({
    message: err.message,
  });
});

app.use('/docs', swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(
    swaggerUi.generateHTML(await import('../../swagger/swagger.json'))
  );
});
