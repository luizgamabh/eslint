"use strict";

const interpolate = require("./interpolate");
const { Linter } = require("./linter");
const SourceCodeFixer = require("./source-code-fixer");

module.exports = { Linter, SourceCodeFixer, interpolate };
