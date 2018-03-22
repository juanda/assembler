// import {assert} from 'assert';
import {ok} from 'assert'
import { Parser, CommandType } from '../src/Parser';

describe('Parser tests', () => {
    var parser: Parser;

    beforeEach(() => {
        
    });

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

        let parser = new Parser('');

        let cleanArray = parser.cleanInputFileArray(dirtyArray);
                
        ok(cleanArray.pop(), "@sum");
        ok(cleanArray.pop(), "D=M");
        ok(cleanArray.pop(), "(LOOP)")
        ok(cleanArray.pop() == "D;JMP");
        ok(cleanArray.pop() == undefined);

    });

    it('load input file',() => {
        let filePath = __dirname + '/../../test_corto.asm';        
        parser = new Parser(filePath);

        ok(parser.loadInputFile());
    });

    it('there are more commands', () => {
        let filePath = __dirname + '/../../test_corto.asm';        
        parser = new Parser(filePath);
        
        ok(parser.loadInputFile());

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
        parser = new Parser(filePath);
        
        ok(parser.loadInputFile());

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
        '3) Debería ser ' + CommandType.A_COMMAND + ' pero es ' + commandType )

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
});