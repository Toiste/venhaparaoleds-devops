const { formatarData } = require("../src/utils/funcoes");

describe("Teste de formatarData", () => {
    it("Deve converter '15/04/1985' para '1985-04-15'", () => {
        expect(formatarData("15/04/1985")).toBe("1985-04-15");
    });

    it("Deve converter '01/01/2000' para '2000-01-01'", () => {
        expect(formatarData("01/01/2000")).toBe("2000-01-01");
    });

    it("Deve lançar um erro se o formato da data for inválido", () => {
        expect(() => formatarData("2024-02-26")).toThrow();
    });

    it("Deve lançar um erro se a string estiver vazia", () => {
        expect(() => formatarData("")).toThrow();
    });
});
