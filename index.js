const { argv } = require('node:process');
const fs = require("node:fs");
const Parser = require("./parser");


function getFileName() {
    let file;
    try {
        file = argv[2];
        console.log("File Name: " + file);
    } catch (error) {
        console.log("There was an error fetching arguements: " + error);
    }

    return file;
}

function readFile(fileName) {
    let content;
    try {
        content = fs.readFileSync(fileName, "utf-8");

    } catch (error) {
        console.log("There was an error with reading file" + error);
    }

    return content.toString();
}

function splitIntoArray(content) {
    return content.split("\r\n");
}

// call program with: npm run start <filename>
// i.e npm run start ../add/Add.asm
function main() {
    const fileName = getFileName();
    const fileAsString = readFile(fileName);
    const contentArray = splitIntoArray(fileAsString);
    const parser = new Parser(contentArray);
    parser.fillLabelTable();

    let newLocation = fileName.split(".asm")[0] + ".txt";
    while (parser.hasMoreCommands()) {
        parser.advance();
        if (!parser.hasMoreCommands()) break;
        console.log(parser.currentCommand);

        let command = "";
        // A COMMANDS ARE 0 INDEXED
        if (parser.commandType() === 0) {
            let bits = parser.symbol();
            command += "0" + parser.symbol().padStart(15, "0") + "\n";
        }

        if (parser.commandType() === 1) {
            command += "111" + (parser.comp() + parser.dest() + parser.jump()).padStart(13, "0") + "\n"; 
        }

        console.log(command);
        fs.appendFileSync(newLocation, command);
    }
}

main();