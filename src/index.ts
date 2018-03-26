import { writeFileSync } from 'fs';
import { dirname, basename } from 'path';
import { Parser, CommandType } from './Parser';
import { Code } from './Code';
import { Util } from './Util';

if(process.argv[2] == undefined){
    console.log("falta el nombre del fichero fuente (asm)");
    process.exit(1);
}

let inputFile = process.argv[2];
let folderName = dirname(inputFile);
let fileName = basename(inputFile, '.asm');
let fileOut = folderName + '/' + fileName + '.hack';

var p = new Parser();
var c = new Code();
var u = new Util();
var out: string[] = [];

p.loadInputFile(inputFile);

while (p.hasMoreCommands()) {
    p.advance();
    let commandType = p.commandType();
    let code = "";
    switch (commandType) {
        case CommandType.A_COMMAND:
            code = "0" + c.address(p.symbol());
            break;
        case CommandType.L_COMMAND:

            break;
        case CommandType.C_COMMAND:
            code = "111" + c.comp(p.comp()) + c.dest(p.dest()) + c.jump(p.jump());
            break;
        default:
    }

    out.push(code);
}

console.log(out);

let codeStr = "";
out.forEach(element => {
    codeStr += element + "\n";
});

writeFileSync(fileOut, codeStr);