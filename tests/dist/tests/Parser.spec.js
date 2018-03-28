"use strict";
exports.__esModule = true;
// import {assert} from 'assert';
var assert_1 = require("assert");
var Parser_1 = require("../src/Parser");
describe('Parser tests', function () {
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
        var parser = new Parser_1.Parser();
        var cleanArray = parser.cleanInputFileArray(dirtyArray);
        assert_1.ok(cleanArray.pop(), "@sum");
        assert_1.ok(cleanArray.pop(), "D=M");
        assert_1.ok(cleanArray.pop(), "(LOOP)");
        assert_1.ok(cleanArray.pop() == "D;JMP");
        assert_1.ok(cleanArray.pop() == undefined);
    });
    it('load input file', function () {
        var filePath = __dirname + '/../../test_corto.asm';
        var parser = new Parser_1.Parser();
        assert_1.ok(parser.loadInputFile(filePath));
    });
    it('there are more commands', function () {
        var filePath = __dirname + '/../../test_corto.asm';
        var parser = new Parser_1.Parser();
        assert_1.ok(parser.loadInputFile(filePath));
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
        var parser = new Parser_1.Parser();
        assert_1.ok(parser.loadInputFile(filePath));
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
    it('get symbol, dest, comp, jump', function () {
        var filePath = __dirname + '/../../test_multi.asm';
        var parser = new Parser_1.Parser();
        assert_1.ok(parser.loadInputFile(filePath));
        parser.advance();
        assert_1.ok(parser.symbol() == 'i', '1) ' + parser.symbol() + ' debería ser "i"');
        parser.advance();
        assert_1.ok(parser.dest() == 'M', '2) ' + parser.dest() + ' debería ser "M"');
        assert_1.ok(parser.comp() == '1', '3) ' + parser.comp() + ' debería ser "1"');
        assert_1.ok(parser.jump() == '', '4) ' + parser.comp() + ' debería ser una cadena vacía');
        parser.advance();
        assert_1.ok(parser.dest() == '', '5) ' + parser.dest() + ' debería ser una cadena vacía');
        assert_1.ok(parser.jump() == 'JMP', '6) ' + parser.jump() + ' debería ser "JMP"');
        assert_1.ok(parser.comp() == '0', '7) ' + parser.comp() + ' debería ser "0"');
        parser.advance();
        assert_1.ok(parser.dest() == 'D', '8) ' + parser.dest() + ' debería ser "D"');
        assert_1.ok(parser.jump() == 'JGT', '9) ' + parser.jump() + ' debería ser "JGT"');
        assert_1.ok(parser.comp() == '3', '10) ' + parser.comp() + ' debería ser "3"');
    });
    it('get label', function () {
        var filePath = __dirname + '/../../test.asm';
        var parser = new Parser_1.Parser();
        assert_1.ok(parser.loadInputFile(filePath));
        for (var i = 0; i < 5; i++) {
            parser.advance();
        }
        assert_1.ok(parser.commandType() == Parser_1.CommandType.L_COMMAND);
        assert_1.ok(parser.label() == "LOOP");
        for (var i = 0; i < 15; i++) {
            parser.advance();
        }
        assert_1.ok(parser.commandType() == Parser_1.CommandType.L_COMMAND);
        assert_1.ok(parser.label() == "END");
    });
    it('build symbol table', function () {
        var filePath = __dirname + '/../../test.asm';
        var parser = new Parser_1.Parser();
        assert_1.ok(parser.loadInputFile(filePath));
        parser.buildSymbolTable();
        var st = parser.getSymbolTable();
        assert_1.ok(st.getAddress("LOOP") == 4);
        assert_1.ok(st.getAddress("END") == 18);
    });
});
//# sourceMappingURL=Parser.spec.js.map