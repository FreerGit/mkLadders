import WebServer, { RetryConnection } from './src/webserver';

const db = 'mongodb://database:27017';

const server = new WebServer();

server.listen();

RetryConnection(db);
