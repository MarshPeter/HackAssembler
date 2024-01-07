const { argv } = require('node:process');

// call program with: npm run start <filename>
function main() {
    const fileName = getFileName();
    console.log("filename: " + fileName);
}

function getFileName() {
    let file;
    try {
        file = argv[2];
    } catch (error) {
        console.log("There was an error fetching arguements: " + error);
    }

    return file;
}

main();