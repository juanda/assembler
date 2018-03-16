"use strict";
exports.__esModule = true;
// import {assert} from 'assert';
var assert_1 = require("assert");
var Parser_1 = require("../src/Parser");
describe('Parser tests', function () {
    var parser;
    beforeEach(function () {
        var commands = [
            '// Adds 1 + ... + 100',
            '@i',
            'M=1',
            '@sum'
        ];
        parser = new Parser_1.Parser('comands');
    });
    it('there are more commands', function () {
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
});
