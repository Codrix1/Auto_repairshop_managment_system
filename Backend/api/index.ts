import { app } from '../src/app';
import { createServer, Server } from 'http';

let server: Server;

export default (req: any, res: any) => {
  if (!server) {
    server = createServer(app);
  }
  server.emit('request', req, res);
};