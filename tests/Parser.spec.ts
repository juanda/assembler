// import {assert} from 'assert';
import { ok } from 'assert'
import { Parser, CommandType } from '../src/Parser';
import { parse } from 'path';

describe('Parser tests', () => {

    it('clean input array', () => {
        let dirtyArray = [
            "// esta línea se quita",
            "",
            "   @sum",
            "   D=M",
            "   // Y esta también",
            "(LOOP)",
            "D;JMP"
        ];

        let parser = new Parser();

        let cleanArray = parser.cleanInputFileArray(dirtyArray);

        ok(cleanArray.pop(), "@sum");
        ok(cleanArray.pop(), "D=M");
        ok(cleanArray.pop(), "(LOOP)")
        ok(cleanArray.pop() == "D;JMP");
        ok(cleanArray.pop() == undefined);

    });

    it('load input file', () => {
        let filePath = __dirname + '/../../test_corto.asm';
        let parser = new Parser();

        ok(parser.loadInputFile(filePath));
    });

    it('there are more commands', () => {
        let filePath = __dirname + '/../../test_corto.asm';
        let parser = new Parser();

        ok(parser.loadInputFile(filePath));

        ok(parser.hasMoreCommands(), 'fallo hay más comandos (1)');
        parser.advance();
        ok(parser.hasMoreCommands(), 'fallo hay más comandos (2)');
        parser.advance();
        ok(parser.hasMoreCommands(), 'fallo hay más comandos (3)');
        parser.advance();
        ok(parser.hasMoreCommands(), 'fallo hay más comandos (4)');
        parser.advance();
        ok(!parser.hasMoreCommands(), 'fallo no más comandos (5)');

    });

    it('get command type', () => {
        let filePath = __dirname + '/../../test.asm';
        let parser = new Parser();

        ok(parser.loadInputFile(filePath));

        parser.hasMoreCommands();
        parser.advance();
        let commandType = parser.commandType();
        ok(parser.commandType() == CommandType.A_COMMAND,
            '1) Debería ser ' + CommandType.A_COMMAND + ' pero es ' + commandType)

        parser.hasMoreCommands();
        parser.advance();
        commandType = parser.commandType();
        ok(commandType == CommandType.C_COMMAND,
            '2) Debería ser ' + CommandType.C_COMMAND + ' pero es ' + commandType)

        parser.hasMoreCommands();
        parser.advance();
        commandType = parser.commandType();
        ok(commandType == CommandType.A_COMMAND,
            '3) Debería ser ' + CommandType.A_COMMAND + ' pero es ' + commandType)

        parser.hasMoreCommands();
        parser.advance();
        commandType = parser.commandType();
        ok(commandType == CommandType.C_COMMAND,
            '4) Debería ser ' + CommandType.C_COMMAND + ' pero es ' + commandType)

        parser.hasMoreCommands();
        parser.advance();
        commandType = parser.commandType();
        ok(commandType == CommandType.L_COMMAND,
            '5) Debería ser ' + CommandType.L_COMMAND + ' pero es ' + commandType)
    });

    it('get symbol, dest, comp, jump', () => {
        let filePath = __dirname + '/../../test_multi.asm';
        let parser = new Parser();

        ok(parser.loadInputFile(filePath));

        parser.advance();
        ok(parser.symbol() == 'i', '1) ' + parser.symbol() + ' debería ser "i"');
        parser.advance();
        ok(parser.dest() == 'M', '2) ' + parser.dest() + ' debería ser "M"');
        ok(parser.comp() == '1', '3) ' + parser.comp() + ' debería ser "1"');
        ok(parser.jump() == '', '4) ' + parser.comp() + ' debería ser una cadena vacía')
        parser.advance();
        ok(parser.dest() == '', '5) ' + parser.dest() + ' debería ser una cadena vacía')
        ok(parser.jump() == 'JMP', '6) ' + parser.jump() + ' debería ser "JMP"');
        ok(parser.comp() == '0', '7) ' + parser.comp() + ' debería ser "0"');
        parser.advance();
        ok(parser.dest() == 'D', '8) ' + parser.dest() + ' debería ser "D"')
        ok(parser.jump() == 'JGT', '9) ' + parser.jump() + ' debería ser "JGT"');
        ok(parser.comp() == '3', '10) ' + parser.comp() + ' debería ser "3"');

    });

    it('get label', () => {
        let filePath = __dirname + '/../../test.asm';
        let parser = new Parser();

        ok(parser.loadInputFile(filePath));

        for(let i = 0; i < 5 ; i ++){
            parser.advance();
        }

        ok(parser.commandType() == CommandType.L_COMMAND);
        ok(parser.label() == "LOOP");

        for(let i = 0; i < 15 ; i ++){
            parser.advance();
        }

        ok(parser.commandType() == CommandType.L_COMMAND);
        ok(parser.label() == "END");

    });

    it('build symbol table', () => {
        let filePath = __dirname + '/../../test.asm';
        let parser = new Parser();

        ok(parser.loadInputFile(filePath));

        parser.buildSymbolTablePass1();

        let st = parser.getSymbolTable();

        ok(st.getAddress("LOOP") == 4);
        ok(st.getAddress("END") == 18);

        parser.buildSymbolTablePass2();

        parser.advance();
        ok(parser.symbol() == '@0');
        parser.advance();
        parser.advance();
        ok(parser.symbol() == '@1');
    });
});