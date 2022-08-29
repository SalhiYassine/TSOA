// src/server.ts
import mongoose from 'mongoose';
import { app } from './app';

mongoose
  .connect(
    'mongodb+srv://YassineSalhi:DzlJ1J6ntgBpRSfN@cluster0.t9xdbce.mongodb.net/?retryWrites=true&w=majority',
    {
      // @ts-ignore
      useNewUrlParser: true,
      useUnifiedTopology: true,
      retryWrites: true,
    }
  )
  .then(() => {
    const port = process.env.PORT || 3000;

    app.listen(port, () =>
      console.log(`Example app listening at http://localhost:${port}`)
    );
  });
