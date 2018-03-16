"use strict";
exports.__esModule = true;
var CommandType;
(function (CommandType) {
    CommandType[CommandType["A_COMMAND"] = 0] = "A_COMMAND";
    CommandType[CommandType["C_COMMAND"] = 1] = "C_COMMAND";
    CommandType[CommandType["L_COMMAND"] = 2] = "L_COMMAND";
    CommandType[CommandType["Bad_COMMAND"] = 3] = "Bad_COMMAND";
})(CommandType || (CommandType = {}));
var Parser = /** @class */ (function () {
    function Parser(inputFilePath) {
    }
    Parser.prototype.openInputFile = function () {
        return true;
    };
    Parser.prototype.hasMoreCommands = function () {
        return this.inputFileArray.length > 0;
    };
    Parser.prototype.advance = function () {
        this.currentCommand = this.inputFileArray.pop();
        return true;
    };
    Parser.prototype.commandType = function () {
        if (this.currentCommand.length == 0)
            return CommandType.Bad_COMMAND;
        var firstChar = this.currentCommand.charAt(0);
        switch (firstChar) {
            case '@':
                break;
            case '(':
                break;
            case '':
                break;
            default:
                break;
        }
        if (firstChar == '@') {
            return CommandType.A_COMMAND;
        }
        else if (firstChar == '(') {
            return CommandType.L_COMMAND;
        }
        else if (firstChar == '')
            return CommandType.A_COMMAND;
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
