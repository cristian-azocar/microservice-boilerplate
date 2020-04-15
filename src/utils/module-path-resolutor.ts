import path from 'path';
import appModulePath from 'app-module-path';

const projectRootPath: string = path.join(__dirname, '../../');

appModulePath.addPath(projectRootPath);
