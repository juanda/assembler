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
    function Parser() {
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
        // atención el array de comandos limpio está invertido,
        // pero lo queremos así pues después lo iremos recorriendo
        // con pop()
        return clean;
    };
    Parser.prototype.loadInputFile = function (inputFilePath) {
        this.inputFilePath = inputFilePath;
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
    /////// Extracción de los tokens del comando //////
    // el comando a parsear tiene la pinta dest=comp;jump
    // donde dest=, o ;jump pueden no aparecer.
    Parser.prototype.symbol = function () {
        var splitted = this.currentCommand.split("@");
        return splitted[1];
    };
    // si hay dest hay signo = en la expresión
    Parser.prototype.dest = function () {
        var splitted = this.currentCommand.split("=");
        return splitted[0];
    };
    // si hay jump, hay signo ; en la expresión
    Parser.prototype.jump = function () {
        var splitted = this.currentCommand.split(";");
        return splitted.pop();
    };
    Parser.prototype.comp = function () {
        var op = (this.currentCommand.indexOf("=") != -1) ? "=" : ";";
        var splitted = this.currentCommand.split(op);
        if (op == "=") {
            return splitted[1].split(";")[0];
        }
        else {
            return splitted[0];
        }
    };
    return Parser;
}());
exports.Parser = Parser;
//# sourceMappingURL=Parser.js.map