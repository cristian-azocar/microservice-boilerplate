import path from 'path';
import nconf from 'nconf';
import yaml from 'js-yaml';

const NODE_ENV: string = process.env.NODE_ENV || 'development';
const settingsPath = '../../settings';
const format = {
  parse: yaml.safeLoad,
  stringify: yaml.safeDump,
};

// Default values have first priority
nconf.defaults({
  NODE_ENV,
});

// Local file have second priority
nconf.file('local', {
  file: path.join(__dirname, `${settingsPath}/local.yml`),
  format,
});

// Command line args and environment vars have third priority
nconf.argv().env();

// Files based on environment have fourth priority
nconf.file('environment', {
  file: path.join(__dirname, `${settingsPath}/${NODE_ENV}.yml`),
  format,
});

// Default file have the least priority
nconf.file('default', {
  file: path.join(__dirname, `${settingsPath}/default.yml`),
  format,
});
