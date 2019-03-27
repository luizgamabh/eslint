"use strict";

module.exports = {
    root: true,
    plugins: [
        "eslint-plugin",
        "internal-rules"
    ],
    extends: [
        "eslint",
        "plugin:eslint-plugin/recommended"
    ],
    rules: {
        "eslint-plugin/consistent-output": "error",
        "eslint-plugin/no-deprecated-context-methods": "error",
        "eslint-plugin/prefer-output-null": "error",
        "eslint-plugin/prefer-placeholders": "error",
        "eslint-plugin/report-message-format": ["error", "[^a-z].*\\.$"],
        "eslint-plugin/require-meta-type": "error",
        "eslint-plugin/test-case-property-ordering": [
            "error",

            // https://github.com/not-an-aardvark/eslint-plugin-eslint-plugin/issues/79
            [
                "filename",
                "code",
                "output",
                "options",
                "parser",
                "parserOptions",
                "globals",
                "env",
                "errors"
            ]
        ],
        "eslint-plugin/test-case-shorthand-strings": "error",
        "internal-rules/multiline-comment-style": "error"
    },

    overrides: [
        {
            files: ["lib/rules/*", "tools/internal-rules/*"],
            excludedFiles: ["index.js"],
            rules: {
                "internal-rules/no-invalid-meta": "error",
                "internal-rules/consistent-docs-description": "error"

                /*
                 * TODO: enable it when all the rules using meta.messages
                 * "internal-rules/consistent-meta-messages": "error"
                 */
            }
        },
        {
            files: ["tools/internal-rules/*"],
            rules: {
                "node/no-unpublished-require": "off"
            }
        },
        {
            files: ["lib/rules/*"],
            excludedFiles: ["index.js"],
            rules: {
                "internal-rules/consistent-docs-url": "error"
            }
        },
        {
            files: ["tests/**/*"],
            env: { mocha: true },
            rules: {
                "no-restricted-syntax": ["error", {
                    selector: "CallExpression[callee.object.name='assert'][callee.property.name='doesNotThrow']",
                    message: "`assert.doesNotThrow()` should be replaced with a comment next to the code."
                }]
            }
        },

        // Restrict relative path imports
        {
            files: ["lib/cli-engine/**/*"],
            rules: {
                "no-restricted-modules": ["error", {
                    patterns: [
                        "**/init",
                        "**/init/**/*",
                        "**/linter/**/*",
                        "**/rules/**/*",
                        "**/source-code/**/*",
                        "**/testers/**/*"
                    ]
                }]
            }
        },
        {
            files: ["lib/init/**/*"],
            rules: {
                "no-restricted-modules": ["error", {
                    patterns: [
                        "**/cli-engine/**/*",
                        "**/linter/**/*",
                        "**/rules/**/*",
                        "**/source-code/**/*",
                        "**/testers/**/*"
                    ]
                }]
            }
        },
        {
            files: ["lib/linter/**/*"],
            rules: {
                "no-restricted-modules": ["error", {
                    patterns: [
                        "fs",
                        "**/cli-engine",
                        "**/cli-engine/**/*",
                        "**/init",
                        "**/init/**/*",
                        "**/rules/**/*",
                        "**/source-code/**/*",
                        "**/testers",
                        "**/testers/**/*"
                    ]
                }]
            }
        },
        {
            files: ["lib/rules/**/*"],
            rules: {
                "no-restricted-modules": ["error", {
                    patterns: [
                        "fs",
                        "**/cli-engine",
                        "**/cli-engine/**/*",
                        "**/init",
                        "**/init/**/*",
                        "**/linter",
                        "**/linter/**/*",
                        "**/source-code",
                        "**/source-code/**/*",
                        "**/testers",
                        "**/testers/**/*"
                    ]
                }]
            }
        },
        {
            files: ["lib/shared/**/*"],
            rules: {
                "no-restricted-modules": ["error", {
                    patterns: [
                        "**/cli-engine",
                        "**/cli-engine/**/*",
                        "**/init",
                        "**/init/**/*",
                        "**/linter",
                        "**/linter/**/*",
                        "**/rules/**/*",
                        "**/source-code",
                        "**/source-code/**/*",
                        "**/testers",
                        "**/testers/**/*"
                    ]
                }]
            }
        },
        {
            files: ["lib/source-code/**/*"],
            rules: {
                "no-restricted-modules": ["error", {
                    patterns: [
                        "fs",
                        "**/cli-engine",
                        "**/cli-engine/**/*",
                        "**/init",
                        "**/init/**/*",
                        "**/linter",
                        "**/linter/**/*",
                        "**/rules",
                        "**/rules/**/*",
                        "**/testers",
                        "**/testers/**/*"
                    ]
                }]
            }
        },
        {
            files: ["lib/testers/**/*"],
            rules: {
                "no-restricted-modules": ["error", {
                    patterns: [
                        "**/cli-engine",
                        "**/cli-engine/**/*",
                        "**/init",
                        "**/init/**/*",
                        "**/linter/**/*",
                        "**/rules/**/*",
                        "**/source-code/**/*"
                    ]
                }]
            }
        }
    ]
};
