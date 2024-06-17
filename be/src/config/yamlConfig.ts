import * as fs from 'fs';
import * as yaml from 'js-yaml';

export const loadYamlConfig = (filePath: string) => {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const config = yaml.load(fileContents) as Record<string, any>;

  Object.keys(config).forEach(key => {
    if (typeof config[key] === 'object') {
      Object.keys(config[key]).forEach(subKey => {
        if (typeof config[key][subKey] === 'string' && config[key][subKey].startsWith('${') && config[key][subKey].endsWith('}')) {
          const envVar = config[key][subKey].slice(2, -1);
          config[key][subKey] = process.env[envVar];
        }
      });
    }
  });

  return config;
};