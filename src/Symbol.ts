export class SymbolTable {

    private st: { [key: string]: number; } = {};
    private nextFreeAddressMemory: number

    constructor() {
        this.st["SP"] = 0;
        this.st["LCL"] = 1;
        this.st["ARG"] = 2;
        this.st["THIS"] = 3;
        this.st["THAT"] = 4;
        this.st["R0"] = 0;
        this.st["R1"] = 1;
        this.st["R2"] = 2;
        this.st["R3"] = 3;
        this.st["R4"] = 4;
        this.st["R5"] = 5;
        this.st["R6"] = 6;
        this.st["R7"] = 7;
        this.st["R8"] = 8;
        this.st["R9"] = 9;
        this.st["R10"] = 10;
        this.st["R11"] = 11;
        this.st["R12"] = 12;
        this.st["R13"] = 13;
        this.st["R14"] = 14;
        this.st["R15"] = 15;
        this.st["SCREEN"] = 16384;
        this.st["KBD"] = 24576

        this.nextFreeAddressMemory = 16;
    }

    getNextFreeMemoryAddress(){
        return this.nextFreeAddressMemory;
    }

    addEntry(symbol: string, address: number){
        this.st[symbol] = address;
    }

    contains(symbol: string): boolean {
        return this.st[symbol] != undefined;
    }

    getAddress(symbol: string): number {
        return this.st[symbol];
    }
}