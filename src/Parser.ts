import { existsSync, readFileSync } from 'fs';
import { ESPIPE } from 'constants';

export enum CommandType {
    A_COMMAND,
    C_COMMAND,
    L_COMMAND,
    Bad_COMMAND
}

export class Parser {

    private inputFilePath;
    private inputFileArray: string[];
    private currentCommand: string;

    constructor(inputFilePath: string) {
        this.inputFilePath = inputFilePath;
    }

    cleanInputFileArray(dirty: string[]): string[] {
        let clean: string[] = [];
        let len = dirty.length;
        for (let i = 0; i < len; i++) {
            let line = dirty.pop().trim();      
            let strippedLine = line.split(" ");      
            if (["", "//"].indexOf(strippedLine[0]) == -1) {
                clean.push(line);
            }
        }
        // atención el array de comandos limpio está invertido,
        // pero lo queremos así pues después lo iremos recorriendo
        // con pop()
        return clean;
    }

    loadInputFile(): boolean {
        if (!existsSync(this.inputFilePath)) return false;

        let buffer: string = readFileSync(this.inputFilePath, { encoding: 'utf8' });
        let inDirtyFileArray = buffer.split("\n");
        this.inputFileArray = this.cleanInputFileArray(inDirtyFileArray);
        return true;
    }

    hasMoreCommands(): boolean {        
        return this.inputFileArray.length > 0;
    }

    advance(): boolean {
        this.currentCommand = this.inputFileArray.pop();
        return this.currentCommand !== undefined;
    }

    commandType(): CommandType {
        if (this.currentCommand.length == 0) return CommandType.Bad_COMMAND;
        let firstChar = this.currentCommand.charAt(0);
        switch (firstChar) {
            case '@':
                return CommandType.A_COMMAND;                
            case '(':
                return CommandType.L_COMMAND;                            
            default:
                return CommandType.C_COMMAND;
        }        
    }

    symbol(): string {
        let splitted = this.currentCommand.split("@");

        return splitted[0];
    }

    dest(): string {
        let splitted = this.currentCommand.split("=");
        return splitted[0];
    }

    comp(): string {
        let op = (this.currentCommand.indexOf("=") != -1)? "=" : ";";
        let splitted = this.currentCommand.split(op);
        if(op == "="){
            return splitted[1];
        }else{
            splitted.pop();
            return splitted.pop();
        }        
    }

    jump(): string {
        let splitted = this.currentCommand.split(";");
        return splitted.pop();
    }

}