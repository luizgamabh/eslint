/**
 * @fileoverview Defines a schema for configs.
 * @author Sylvan Mably
 */

"use strict";

const baseConfigProperties = {
    env: { type: "object" },
    extends: { $ref: "#/definitions/stringOrStrings" },
    globals: { type: "object" },
    overrides: {
        type: "array",
        items: { $ref: "#/definitions/overrideConfig" },
        additionalItems: false
    },
    parser: { type: ["string", "null"] },
    parserOptions: { type: "object" },
    plugins: {
        anyOf: [
            { type: "array" },
            {
                type: "object",
                additionalProperties: { type: "string" }
            }
        ]
    },
    processor: { type: "string" },
    rules: { type: "object" },
    settings: { type: "object" },

    ecmaFeatures: { type: "object" } // deprecated; logs a warning when used
};

const configSchema = {
    definitions: {
        stringOrStrings: {
            oneOf: [
                { type: "string" },
                {
                    type: "array",
                    items: { type: "string" }
                }
            ]
        },
        stringOrStringsRequired: {
            oneOf: [
                { type: "string" },
                {
                    type: "array",
                    items: { type: "string" },
                    minItems: 1
                }
            ]
        },

        // Array Config at top-level.
        arrayConfig: {
            type: "array",
            items: {
                anyOf: [
                    { type: "string" },
                    { $ref: "#/definitions/arrayConfig" },
                    { $ref: "#/definitions/objectConfig" },
                    { $ref: "#/definitions/overrideConfig" }
                ]
            },
            additionalItems: false
        },

        // Config at top-level.
        objectConfig: {
            type: "object",
            properties: Object.assign(
                {
                    root: { type: "boolean" }
                },
                baseConfigProperties
            ),
            additionalProperties: false
        },

        // Config in `overrides`.
        overrideConfig: {
            type: "object",
            properties: Object.assign(
                {
                    excludedFiles: { $ref: "#/definitions/stringOrStrings" },
                    files: { $ref: "#/definitions/stringOrStringsRequired" }
                },
                baseConfigProperties
            ),
            required: ["files"],
            additionalProperties: false
        }
    },

    anyOf: [
        { $ref: "#/definitions/arrayConfig" },
        { $ref: "#/definitions/objectConfig" }
    ]
};

module.exports = configSchema;
