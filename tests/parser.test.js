const parser = require('../parser');

test("check to see if the program works as expected with classes", () => {
    let testParser = new parser([]);

    expect(testParser.test()).toStrictEqual("success");
})