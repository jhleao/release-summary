"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseConfig = void 0;
const core = __importStar(require("@actions/core"));
const yaml = __importStar(require("js-yaml"));
const fs_1 = require("fs");
const CONFIG_PATHS = ['.github/.summaryrc.yml', '.github/.summaryrc.yaml'];
const getConfigFile = () => {
    for (const path of CONFIG_PATHS) {
        try {
            if (!(0, fs_1.existsSync)(path))
                continue;
            const config = (0, fs_1.readFileSync)(path, 'utf8');
            return config;
        }
        catch (_a) { }
    }
    core.setFailed(`Could not find config file in any of ${CONFIG_PATHS.join(', ')}`);
    process.exit(1);
};
const validateConfig = (config) => {
    let errors = [];
    if (!config.sections)
        errors.push('Config file must contain a `sections` property');
    if (!Array.isArray(config.sections))
        errors.push('`sections` property must be an array');
    if (config.sections.length === 0)
        errors.push('`sections` property must not be empty');
    for (const section of config.sections) {
        if (!section.from)
            errors.push('All sections must have a `from` property');
        if (!section.title)
            errors.push('All sections must have a `title` property');
        if (!['condensed', 'multiline'].includes(section.style))
            errors.push('All sections must have a `style` property of either `condensed` or `multiline`');
    }
    if (errors.length) {
        core.setFailed(errors.join('\n'));
        process.exit(1);
    }
};
const parseConfig = () => {
    const rawCfg = getConfigFile();
    const parsed = yaml.load(rawCfg);
    validateConfig(parsed);
    return parsed;
};
exports.parseConfig = parseConfig;
