import {existsSync, readFileSync} from 'fs';

enum CommandType {
    A_COMMAND,
    C_COMMAND,
    L_COMMAND,
    Bad_COMMAND
}

export class Parser{
    
    private inputFilePath;
    private inputFileArray: string[];    
    private currentCommand: string;
    
    constructor(inputFilePath: string){
        this.inputFilePath = inputFilePath;
    }

    loadInputFile(): boolean {
        if(!existsSync(this.inputFilePath)) return false;
        
        let buffer: string = readFileSync(this.inputFilePath, {encoding: 'utf8'});
        let splitted = buffer.split("\n");
        return true;
    }

    hasMoreCommands(): boolean {
        return this.inputFileArray.length > 0;        
    }

    advance(): boolean {
        this.currentCommand = this.inputFileArray.pop(); 
        return true;       
    }

    commandType(): CommandType {
        if(this.currentCommand.length == 0) return CommandType.Bad_COMMAND;
        let firstChar = this.currentCommand.charAt(0);
        switch (firstChar) {
            case '@':
                
                break;
            case '(':
                
                break;
            case '':
                
                break;    
            default:
                break;
        }
        if(firstChar == '@'){
            return CommandType.A_COMMAND;
        }else if(firstChar == '('){
            return CommandType.L_COMMAND
        }else if(firstChar == '')

        return CommandType.A_COMMAND;
    }

    symbol(): string {
        return "hola";
    }

    dest(): string {
        return "hola";
    }

    comp(): string {
        return "Hola";
    }

    jump(): string {
        return "Hola";
    }

}