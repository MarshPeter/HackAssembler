const SymbolTable = require("../symbolTable");

test("Check to see if defaults in the symbol Table is properly filled", () => {
    let symbolTable = new SymbolTable();

    expect(symbolTable.symbolTable["SP"]).toBe(0);
    expect(symbolTable.symbolTable["R0"]).toBe(0);
    expect(symbolTable.symbolTable["SCREEN"]).toBe(16384);
    expect(symbolTable.symbolTable["KBD"]).toBe(24576);
})

test("Check to see if the contains method works as expected", () => {
    let symbolTable = new SymbolTable();

    expect(symbolTable.contains("SP")).toBe(true);
    expect(symbolTable.contains("R0")).toBe(true);
    expect(symbolTable.contains("SCREEN")).toBe(true);
    expect(symbolTable.contains("KBD")).toBe(true);
    expect(symbolTable.contains("R16")).toBe(false);
    expect(symbolTable.contains("r16")).toBe(false);
})

test("check to see if new items are successfully added to the symbol table", () => {
    const symbolTable = new SymbolTable();

    symbolTable.addEntry("Test", 16);
    expect(symbolTable.contains("Test")).toBe(true);
    expect(symbolTable.contains("test")).toBe(false);
})

test("check to see if getAddress works as expected", () => {
    const symbolTable = new SymbolTable();

    symbolTable.addEntry("Test", 16);
    expect(symbolTable.getAddress("SP")).toBe(0);
    expect(symbolTable.getAddress("R0")).toBe(0);
    expect(symbolTable.getAddress("R15")).toBe(15);
    expect(symbolTable.getAddress("SCREEN")).toBe(16384);
    expect(symbolTable.getAddress("KBD")).toBe(24576);
    expect(symbolTable.getAddress("Test")).toBe(16);
    expect(symbolTable.getAddress("R16")).toBe(-1);
})