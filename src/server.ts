import app from './app';

const port: number = +process.env.PORT || 3000;

app.listen(port, (): void => {
  // eslint-disable-next-line no-console
  console.log(`Server running in port ${port}`);
});
