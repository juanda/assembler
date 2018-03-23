import { Parser, CommandType } from './Parser';
import { Code } from './Code';
import { Util } from './Util';

var p = new Parser();
var c = new Code();
var u = new Util();
var out: string[] = [];

p.loadInputFile(__dirname + '/../src/prueba.asm');

while (p.hasMoreCommands()) {
    p.advance();
    let commandType = p.commandType();
    let code = "";
    switch (commandType) {
        case CommandType.A_COMMAND:
            code = "0" + u.getBinary(p.symbol());
            break;
        case CommandType.L_COMMAND:

            break;
        case CommandType.C_COMMAND:
            code = "111" + c.dest(p.dest()) + c.comp(p.comp()) + c.jump(p.jump());
            break;
        default:
    }

    out.push(code);
}

console.log(out);


