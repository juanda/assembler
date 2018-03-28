import { existsSync, readFileSync, writeFileSync } from 'fs';
import { SymbolTable } from './Symbol';

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
    private symbolTable: SymbolTable = new SymbolTable();

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

    loadInputFile(inputFilePath: string): boolean {
        this.inputFilePath = inputFilePath;
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

    /////// Extracción de los tokens del comando //////
    // el comando a parsear tiene la pinta dest=comp;jump
    // donde dest=, o ;jump pueden no aparecer.
    symbol(): string {
        let splitted = this.currentCommand.split("@");

        return splitted[1];
    }

    // si hay dest hay signo = en la expresión
    dest(): string {
        let op = (this.currentCommand.indexOf("=") != -1) ? "=" : ";";
        let splitted = this.currentCommand.split(op);
        if (op == "=") {
            return splitted[0];
        } else {
            return "";
        }
    }

    // si hay jump, hay signo ; en la expresión
    jump(): string {
        let op = (this.currentCommand.indexOf(";") != -1) ? ";" : "=";
        let splitted = this.currentCommand.split(op);
        if (op == ";") {
            return splitted.pop();
        } else {
            return "";
        }
    }

    label(): string {
        let splitted1 = this.currentCommand.split("(");
        let splitted2 = splitted1[1].split(")");
        let label = splitted2[0];
        return label;
    }

    comp(): string {
        let op = (this.currentCommand.indexOf("=") != -1) ? "=" : ";";
        let splitted = this.currentCommand.split(op);
        if (op == "=") {
            return splitted[1].split(";")[0];
        } else {
            return splitted[0];
        }
    }

    buildSymbolTable() {
        let romAddress = 0;
        while (this.hasMoreCommands()) {
            this.advance();
            let ctype = this.commandType();
            if (ctype == CommandType.L_COMMAND) {
                let symbol = this.label();
                this.symbolTable.addEntry(symbol, romAddress);
            } else {
                romAddress++;
            }
        }
    }

    getSymbolTable(): SymbolTable{
        return this.symbolTable;
    }
}