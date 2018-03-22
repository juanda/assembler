"use strict";
exports.__esModule = true;
// import {assert} from 'assert';
var assert_1 = require("assert");
var Parser_1 = require("../src/Parser");
describe('Parser tests', function () {
    var parser;
    beforeEach(function () {
    });
    it('clean input array', function () {
        var dirtyArray = [
            "// esta línea se quita",
            "",
            "   @sum",
            "   D=M",
            "   // Y esta también",
            "(LOOP)",
            "D;JMP"
        ];
        var parser = new Parser_1.Parser('');
        var cleanArray = parser.cleanInputFileArray(dirtyArray);
        assert_1.ok(cleanArray.pop(), "@sum");
        assert_1.ok(cleanArray.pop(), "D=M");
        assert_1.ok(cleanArray.pop(), "(LOOP)");
        assert_1.ok(cleanArray.pop() == "D;JMP");
        assert_1.ok(cleanArray.pop() == undefined);
    });
    it('load input file', function () {
        var filePath = __dirname + '/../../test_corto.asm';
        parser = new Parser_1.Parser(filePath);
        assert_1.ok(parser.loadInputFile());
    });
    it('there are more commands', function () {
        var filePath = __dirname + '/../../test_corto.asm';
        parser = new Parser_1.Parser(filePath);
        assert_1.ok(parser.loadInputFile());
        assert_1.ok(parser.hasMoreCommands(), 'fallo hay más comandos (1)');
        parser.advance();
        assert_1.ok(parser.hasMoreCommands(), 'fallo hay más comandos (2)');
        parser.advance();
        assert_1.ok(parser.hasMoreCommands(), 'fallo hay más comandos (3)');
        parser.advance();
        assert_1.ok(parser.hasMoreCommands(), 'fallo hay más comandos (4)');
        parser.advance();
        assert_1.ok(!parser.hasMoreCommands(), 'fallo no más comandos (5)');
    });
    it('get command type', function () {
        var filePath = __dirname + '/../../test.asm';
        parser = new Parser_1.Parser(filePath);
        assert_1.ok(parser.loadInputFile());
        parser.hasMoreCommands();
        parser.advance();
        var commandType = parser.commandType();
        assert_1.ok(parser.commandType() == Parser_1.CommandType.A_COMMAND, '1) Debería ser ' + Parser_1.CommandType.A_COMMAND + ' pero es ' + commandType);
        parser.hasMoreCommands();
        parser.advance();
        commandType = parser.commandType();
        assert_1.ok(commandType == Parser_1.CommandType.C_COMMAND, '2) Debería ser ' + Parser_1.CommandType.C_COMMAND + ' pero es ' + commandType);
        parser.hasMoreCommands();
        parser.advance();
        commandType = parser.commandType();
        assert_1.ok(commandType == Parser_1.CommandType.A_COMMAND, '3) Debería ser ' + Parser_1.CommandType.A_COMMAND + ' pero es ' + commandType);
        parser.hasMoreCommands();
        parser.advance();
        commandType = parser.commandType();
        assert_1.ok(commandType == Parser_1.CommandType.C_COMMAND, '4) Debería ser ' + Parser_1.CommandType.C_COMMAND + ' pero es ' + commandType);
        parser.hasMoreCommands();
        parser.advance();
        commandType = parser.commandType();
        assert_1.ok(commandType == Parser_1.CommandType.L_COMMAND, '5) Debería ser ' + Parser_1.CommandType.L_COMMAND + ' pero es ' + commandType);
    });
});
