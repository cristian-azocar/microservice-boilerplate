import { Server } from 'http';
import app from './app';

const port: number = +process.env.PORT || 3000;
const server: Server = app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running in port ${port}`);
});

export default server;
