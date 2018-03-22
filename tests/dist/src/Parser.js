"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var CommandType;
(function (CommandType) {
    CommandType[CommandType["A_COMMAND"] = 0] = "A_COMMAND";
    CommandType[CommandType["C_COMMAND"] = 1] = "C_COMMAND";
    CommandType[CommandType["L_COMMAND"] = 2] = "L_COMMAND";
    CommandType[CommandType["Bad_COMMAND"] = 3] = "Bad_COMMAND";
})(CommandType = exports.CommandType || (exports.CommandType = {}));
var Parser = /** @class */ (function () {
    function Parser(inputFilePath) {
        this.inputFilePath = inputFilePath;
    }
    Parser.prototype.cleanInputFileArray = function (dirty) {
        var clean = [];
        var len = dirty.length;
        for (var i = 0; i < len; i++) {
            var line = dirty.pop().trim();
            var strippedLine = line.split(" ");
            if (["", "//"].indexOf(strippedLine[0]) == -1) {
                clean.push(line);
            }
        }
        return clean;
    };
    Parser.prototype.loadInputFile = function () {
        if (!fs_1.existsSync(this.inputFilePath))
            return false;
        var buffer = fs_1.readFileSync(this.inputFilePath, { encoding: 'utf8' });
        var inDirtyFileArray = buffer.split("\n");
        this.inputFileArray = this.cleanInputFileArray(inDirtyFileArray);
        return true;
    };
    Parser.prototype.hasMoreCommands = function () {
        return this.inputFileArray.length > 0;
    };
    Parser.prototype.advance = function () {
        this.currentCommand = this.inputFileArray.pop();
        return this.currentCommand !== undefined;
    };
    Parser.prototype.commandType = function () {
        if (this.currentCommand.length == 0)
            return CommandType.Bad_COMMAND;
        var firstChar = this.currentCommand.charAt(0);
        switch (firstChar) {
            case '@':
                return CommandType.A_COMMAND;
            case '(':
                return CommandType.L_COMMAND;
            default:
                return CommandType.C_COMMAND;
        }
    };
    Parser.prototype.symbol = function () {
        return "hola";
    };
    Parser.prototype.dest = function () {
        return "hola";
    };
    Parser.prototype.comp = function () {
        return "Hola";
    };
    Parser.prototype.jump = function () {
        return "Hola";
    };
    return Parser;
}());
exports.Parser = Parser;
