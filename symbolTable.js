class SymbolTable {
    constructor() {
        this.symbolTable = {};
        this.nextFreeMemoryAddress = 16;
        const defaults = [
            ["SP", 0],
            ["LCL", 1],
            ["ARG", 2],
            ["THIS", 3],
            ["THAT", 4],
            ["R0", 0],
            ["R1", 1],
            ["R2", 2],
            ["R3", 3],
            ["R4", 4],
            ["R5", 5],
            ["R6", 6],
            ["R7", 7],
            ["R8", 8],
            ["R9", 9],
            ["R10", 10],
            ["R11", 11],
            ["R12", 12],
            ["R13", 13],
            ["R14", 14],
            ["R15", 15],
            ["SCREEN", 16384],
            ["KBD", 24576],
        ]

        for (let i = 0; i < defaults.length; i++) {
            this.symbolTable[defaults[i][0]] = defaults[i][1];
        }
    }

    getNextMemoryAddress() {
        return this.nextFreeMemoryAddress++;
    }    


    addEntry(symbol, address) {
        if (!this.contains(symbol)) {
            this.symbolTable[symbol] = address;
        }
    }

    contains(symbol) {
        return this.symbolTable.hasOwnProperty(symbol);
    }

    getAddress(symbol) {
        if (this.contains(symbol)) {
            return this.symbolTable[symbol];
        }

        return -1;
    }
}

module.exports = SymbolTable;