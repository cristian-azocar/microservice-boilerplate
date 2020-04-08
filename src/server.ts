import { Server } from 'http';
import app from './app';

const port: number = +process.env.PORT || 3000;
const server: Server = app.listen(port);

module.exports = server;
