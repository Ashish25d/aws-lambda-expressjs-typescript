import express = require('express');
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser = require('cookie-parser');
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';
import { Server } from 'http';
import { APIGatewayEvent, Context } from 'aws-lambda';
import routes from './routes/index';


// Port value
const port = process.env.PORT || 3000;

let cachedServer: Server;

// Init express
const app = express();

app.use(eventContext());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

app.use(routes);

// app.listen(port, () => {
//     console.warn(`Server running on ${port} port.`);
// });

exports.handler = async (event: APIGatewayEvent, context: Context) => {
    if (!cachedServer) {
        cachedServer = createServer(app);
    }
    return proxy(cachedServer, event, context, 'PROMISE').promise;
}