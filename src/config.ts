import * as core from '@actions/core';
import { Config } from './types';
import * as yaml from 'js-yaml';
import { existsSync, readFileSync } from 'fs';

const CONFIG_PATHS = ['.github/.summaryrc.yml', '.github/.summaryrc.yaml'];

const getConfigFile = (): string => {
  for (const path of CONFIG_PATHS) {
    try {
      if (!existsSync(path)) continue;
      const config = readFileSync(path, 'utf8');
      return config;
    } catch {}
  }
  core.setFailed(
    `Could not find config file in any of ${CONFIG_PATHS.join(', ')}`
  );
  process.exit(1);
};

const validateConfig = (config: Config) => {
  let errors = [];
  if (!config.sections)
    errors.push('Config file must contain a `sections` property');
  if (!Array.isArray(config.sections))
    errors.push('`sections` property must be an array');
  if (config.sections.length === 0)
    errors.push('`sections` property must not be empty');
  for (const section of config.sections) {
    if (!section.from) errors.push('All sections must have a `from` property');
    if (!section.title)
      errors.push('All sections must have a `title` property');
    if (!['condensed', 'multiline'].includes(section.style))
      errors.push(
        'All sections must have a `style` property of either `condensed` or `multiline`'
      );
  }

  if (errors.length) {
    core.setFailed(errors.join('\n'));
    process.exit(1);
  }
};

export const parseConfig = (): Config => {
  const rawCfg = getConfigFile();
  const parsed = yaml.load(rawCfg) as Config;

  validateConfig(parsed);

  return parsed;
};
