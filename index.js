const { argv } = require('node:process');
const fs = require("node:fs");


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
    console.log(contentArray);
}

main();