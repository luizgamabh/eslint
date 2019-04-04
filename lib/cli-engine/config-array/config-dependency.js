/**
 * @fileoverview `ConfigDependency` class.
 *
 * `ConfigDependency` class expresses a loaded parser or plugin.
 *
 * If the parser or plugin was loaded successfully, it has `definition` property
 * and `filePath` property. Otherwise, it has `error` property.
 *
 * When `JSON.stringify()` converted a `ConfigDependency` object to a JSON, it
 * omits `definition` property.
 *
 * `ConfigArrayFactory` creates `ConfigDependency` objects when it loads parsers
 * or plugins.
 *
 * @author Toru Nagashima <https://github.com/mysticatea>
 */
"use strict";

const util = require("util");

/** @typedef {import("../../../conf/config-schema").ConfigData} ConfigData */
/** @typedef {import("../../../conf/environments").Environment} Environment */
/** @typedef {import("../../linter").LintMessage} LintMessage */
/** @typedef {import("../../built-in-rules-index").Rule} Rule */

/**
 * @typedef {Object} ParseResult
 * @property {Object} ast The AST.
 * @property {ScopeManager} [scopeManager] The scope manager of the AST.
 * @property {Record<string, any>} [services] The services that the parser provides.
 * @property {Record<string, string[]>} [visitorKeys] The visitor keys of the AST.
 */

/**
 * @typedef {Object} Parser
 * @property {(text:string, options:Object) => Object} parse The definition of global variables.
 * @property {(text:string, options:Object) => ParseResult} [parseForESLint] The parser options that will be enabled under this environment.
 */

/**
 * @typedef {Object} Plugin
 * @property {Record<string, ConfigData>} [configs] The definition of plugin configs.
 * @property {Record<string, Environment>} [environments] The definition of plugin environments.
 * @property {Record<string, Processor>} [processors] The definition of plugin processors.
 * @property {Record<string, Function | Rule>} [rules] The definition of plugin rules.
 */

/**
 * @typedef {Object} Processor
 * @property {(text:string, filename:string) => Array<string | { text:string, filename:string }>} [preprocess] The function to extract code blocks.
 * @property {(messagesList:LintMessage[][], filename:string) => LintMessage[]} [postprocess] The function to merge messages.
 * @property {boolean} [supportsAutofix] If `true` then it means the processor supports autofix.
 */

/** @typedef {ConfigDependency<Parser>} DependentParser */
/** @typedef {ConfigDependency<Plugin>} DependentPlugin */

/**
 * The class is to store parsers or plugins.
 * This class hides the loaded object from `JSON.stringify()` and `console.log`.
 * @template T
 */
class ConfigDependency {

    /**
     * Initialize this instance.
     * @param {Object} data The dependency data.
     * @param {T} [data.definition] The dependency if the loading succeeded.
     * @param {Error} [data.error] The error object if the loading failed.
     * @param {string} [data.filePath] The actual path to the dependency if the loading succeeded.
     * @param {string} data.id The ID of this dependency.
     * @param {string} data.importerName The name of the config file which loads this dependency.
     * @param {string} data.importerPath The path to the config file which loads this dependency.
     */
    constructor({
        definition = null,
        error = null,
        filePath = null,
        id,
        importerName,
        importerPath
    }) {

        /**
         * The loaded dependency if the loading succeeded.
         * @type {T|null}
         */
        this.definition = definition;

        /**
         * The error object if the loading failed.
         * @type {Error|null}
         */
        this.error = error;

        /**
         * The loaded dependency if the loading succeeded.
         * @type {string|null}
         */
        this.filePath = filePath;

        /**
         * The ID of this dependency.
         * @type {string}
         */
        this.id = id;

        /**
         * The name of the config file which loads this dependency.
         * @type {string}
         */
        this.importerName = importerName;

        /**
         * The path to the config file which loads this dependency.
         * @type {string}
         */
        this.importerPath = importerPath;
    }

    /**
     * @returns {Object} a JSON compatible object.
     */
    toJSON() {
        const {
            definition: _ignore, // eslint-disable-line no-unused-vars
            ...obj
        } = this;

        return obj;
    }

    [util.inspect.custom]() {
        return this.toJSON();
    }
}

module.exports = { ConfigDependency };
