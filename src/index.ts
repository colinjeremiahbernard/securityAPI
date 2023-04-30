import express from 'express';
import { json } from 'body-parser';
import { errorHandler } from './middleware/errorHandler';
import config from './config';

// Instantiate an Express object.
const app = express();
app.use(json());

// Add error handling as the last middleware, just prior to our app.listen call.
// This ensures that all errors are always handled.
app.use(errorHandler);

// Have our API listen on the configured port.
app.listen(config.port, () => {
    console.log(`server is listening on port ${config.port}`);
});