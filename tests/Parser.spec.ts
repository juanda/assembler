// import {assert} from 'assert';
import {ok} from 'assert'
import { Parser } from '../src/Parser';

describe('Parser tests', () => {
    var parser;

    beforeEach(() => {
        let filePath = 
        parser = new Parser('comands');
    });

    it('load input file',() => {

    });

    it('there are more commands', () => {
                
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
});