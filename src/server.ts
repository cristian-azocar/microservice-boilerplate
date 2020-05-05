import './utils/module-path-resolutor';
import 'src/settings/load';
import app from 'src/app';

const port: number = +process.env.PORT || 3000;

// Intentional error to test the pipeline
throw new Error('Error to test the pipeline');
throw new Error('Error 2 to test the pipeline');

app.listen(port, (): void => {
  // eslint-disable-next-line no-console
  console.log(`Server running in port ${port}`);
});
