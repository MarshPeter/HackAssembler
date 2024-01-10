const Encoder = require("./code");
const SymbolTable = require("./symbolTable");

class parser {
    constructor(contentArray) {
        this.content = contentArray;
        this.encoder = new Encoder();
        this.symbolTable = new SymbolTable();
        this.currentLine = 0;
        this.currentCommand = contentArray[this.currentLine];
        this.commandTypes = {
            "A_COMMAND": 0,
            "C_COMMAND": 1,
            "L_COMMAND": 2,
        }
    }

    reset() {
        this.currentLine = 0;
        this.currentCommand = this.content[this.currentLine];
    }

    fillLabelTable() {
        let commandCounter = 0;
        while (this.hasMoreCommands()) {
            if (this.commandType() === this.commandTypes["L_COMMAND"]) {
                let label = this.currentCommand.substring(1, this.currentCommand.length - 1);
                if (!this.symbolTable.contains(label)) {
                    this.symbolTable.addEntry(label, commandCounter + 1);
                }
            }

            commandCounter++;
            this.advance();
        }

        this.reset();
    }

    hasMoreCommands() {
        return this.currentLine < this.content.length; 
    }

    advance() {
        while (this.hasMoreCommands()) {
            if (this.content[this.currentLine].trim() === "") {
                this.currentLine++;
                continue;
            }

            if (this.content[this.currentLine].trim()[0] === "/") {
                this.currentLine++;
                continue
            }

            break;
        }

        this.currentCommand = this.content[this.currentLine++]
    }

    commandType() {
        if (this.currentCommand.trim()[0] === "@") {
            return this.commandTypes["A_COMMAND"];
        }

        if (this.currentCommand.trim()[0] === "(") {
            return this.commandTypes["L_COMMAND"];
        }

        return this.commandTypes["C_COMMAND"];
    }

    symbol() {
        if (this.commandType(this.currentCommand) === this.commandTypes["A_COMMAND"]) {
            let target = this.currentCommand.split("@")[1];
            if (!isNaN(target)) {
                return this.dec2bin(target);
            }

            if (!this.symbolTable.contains()) {
                const nextAddr = this.symbolTable.getNextMemoryAddress();
                this.symbolTable.addEntry(target, nextAddr);
            }

            return this.dec2bin(this.symbolTable.getAddress(target));
        }

        throw new Error("THis is not a A_COMMAND OR L_COMMAND");
    }

    dec2bin(dec) {
        return (dec >>> 0).toString(2);
    }

    isCCommand() {
        return this.commandType(this.currentCommand) === this.commandTypes["C_COMMAND"];
    }

    dest() {
        let destSection = "";
        if (this.currentCommand.includes("=")) {
            destSection = this.currentCommand.split("=")[0].trim();
        }

        return this.encoder.dest(destSection);
    }

    comp() {
        let compSection = "";

        if (this.currentCommand.includes("=")) {
            compSection = this.currentCommand.split("=")[1];
        } else {
            compSection = this.currentCommand.split(";")[0].trim();
        }

        return this.encoder.comp(compSection);
    }

    jump() {
        let jumpSection = "";

        if (this.currentCommand.includes(";")) {
            jumpSection = this.currentCommand.split(";")[1];
        }

        return this.encoder.jump(jumpSection);
    }
}

module.exports = parser;