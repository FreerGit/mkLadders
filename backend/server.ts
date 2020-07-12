import WebServer, { RetryConnection } from './src/webserver';

const db = 'mongodb://database:27017';

const server = new WebServer();

RetryConnection(db);

server.listen();
