import path from 'path';
import nconf from 'nconf';
import yaml from 'js-yaml';

const NODE_ENV: string = process.env.NODE_ENV || 'development';
const settingsPath = `../../settings`;

// Default values have first priority
nconf.defaults({
  NODE_ENV,
});

// Command line args and environment vars have second priority
nconf.argv().env();

// Files based on environment have third priority
nconf.file({
  file: path.join(__dirname, `${settingsPath}/${NODE_ENV}.yml`),
  format: {
    parse: yaml.safeLoad,
    stringify: yaml.safeDump,
  },
});

// Default file have the least priority
nconf.file({
  file: path.join(__dirname, `${settingsPath}/default.yml`),
  format: {
    parse: yaml.safeLoad,
    stringify: yaml.safeDump,
  },
});
