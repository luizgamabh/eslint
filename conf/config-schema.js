/**
 * @fileoverview Defines a schema for configs.
 * @author Sylvan Mably
 */

"use strict";

// Define types for VSCode IntelliSense.
/** @typedef {boolean|"off"|"readable"|"readonly"|"writable"|"writeable"} GlobalConf */
/** @typedef {0|1|2|"off"|"warn"|"error"} SeverityConf */
/** @typedef {SeverityConf|[SeverityConf, ...any[]]} RuleConf */

/**
 * @typedef {Object} EcmaFeatures
 * @property {boolean} [globalReturn] Enabling `return` statements at the top-level.
 * @property {boolean} [jsx] Enabling JSX syntax.
 * @property {boolean} [impliedStrict] Enabling strict mode always.
 */

/**
 * @typedef {Object} ParserOptions
 * @property {EcmaFeatures} [ecmaFeatures] The optional features.
 * @property {3|5|6|7|8|9|10|2015|2016|2017|2018|2019} [ecmaVersion] The ECMAScript version (or revision number).
 * @property {"script"|"module"} [sourceType] The source code type.
 */

/**
 * @typedef {Object} ConfigData
 * @property {Record<string, boolean>} [env] The environment settings.
 * @property {string|string[]} [extends] The path to other config files or the package name of shareable configs.
 * @property {Record<string, GlobalConf>} [globals] The global variable settings.
 * @property {OverrideConfigData[]} [overrides] The override settings per kind of files.
 * @property {string} [parser] The path to a parser or the package name of a parser.
 * @property {ParserOptions} [parserOptions] The parser options.
 * @property {string[]} [plugins] The plugin specifiers.
 * @property {boolean} [root] The root flag.
 * @property {Record<string, RuleConf>} [rules] The rule settings.
 * @property {Object} [settings] The shared settings.
 */

/**
 * @typedef {Object} OverrideConfigData
 * @property {Record<string, boolean>} [env] The environment settings.
 * @property {string|string[]} [excludedFiles] The glob pattarns for excluded files.
 * @property {string|string[]} files The glob pattarns for target files.
 * @property {Record<string, GlobalConf>} [globals] The global variable settings.
 * @property {string} [parser] The path to a parser or the package name of a parser.
 * @property {ParserOptions} [parserOptions] The parser options.
 * @property {string[]} [plugins] The plugin specifiers.
 * @property {Record<string, RuleConf>} [rules] The rule settings.
 * @property {Object} [settings] The shared settings.
 */

const baseConfigProperties = {
    env: { type: "object" },
    globals: { type: "object" },
    parser: { type: ["string", "null"] },
    parserOptions: { type: "object" },
    plugins: { type: "array" },
    rules: { type: "object" },
    settings: { type: "object" },

    ecmaFeatures: { type: "object" } // deprecated; logs a warning when used
};

const overrideProperties = Object.assign(
    {},
    baseConfigProperties,
    {
        files: {
            oneOf: [
                { type: "string" },
                {
                    type: "array",
                    items: { type: "string" },
                    minItems: 1
                }
            ]
        },
        excludedFiles: {
            oneOf: [
                { type: "string" },
                {
                    type: "array",
                    items: { type: "string" }
                }
            ]
        }
    }
);

const topLevelConfigProperties = Object.assign(
    {},
    baseConfigProperties,
    {
        extends: { type: ["string", "array"] },
        root: { type: "boolean" },
        overrides: {
            type: "array",
            items: {
                type: "object",
                properties: overrideProperties,
                required: ["files"],
                additionalProperties: false
            }
        }
    }
);

const configSchema = {
    type: "object",
    properties: topLevelConfigProperties,
    additionalProperties: false
};

module.exports = configSchema;
