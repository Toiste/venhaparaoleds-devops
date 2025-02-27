const fs = require("fs");
const path = require("path");
const { readFileCandidatos, readFileConcursos } = require("../src/utils/funcoes");

describe("Utils - File Reader", () => {
    beforeAll(() => {
        // Criando arquivos temporários para testes
        fs.writeFileSync(
            path.join(__dirname, "candidatos_test.txt"),
            "João Silva 15/04/1985 123.456.789-00 [professor, engenheiro]\nMaria Oliveira 22/08/1990 987.654.321-00 [analista]"
        );

        fs.writeFileSync(
            path.join(__dirname, "concursos_test.txt"),
            "SEDU 9/2016 61828450843 [professor, analista]\nSETADES 17/2016 66797347091 [engenheiro]"
        );
    });

    afterAll(() => {
        // Removendo arquivos temporários
        fs.unlinkSync(path.join(__dirname, "candidatos_test.txt"));
        fs.unlinkSync(path.join(__dirname, "concursos_test.txt"));
    });

    test("Deve ler e processar corretamente o arquivo de candidatos", () => {
        const filePath = path.join(__dirname, "candidatos_test.txt");
        const resultado = readFileCandidatos(filePath);
        expect(resultado).toEqual([
            ["João Silva", "15/04/1985", "123.456.789-00", "professor, engenheiro"],
            ["Maria Oliveira", "22/08/1990", "987.654.321-00", "analista"]
        ]);
    });

    test("Deve ler e processar corretamente o arquivo de concursos", () => {
        const filePath = path.join(__dirname, "concursos_test.txt");
        const resultado = readFileConcursos(filePath);
        expect(resultado).toEqual([
            ["SEDU", "9/2016", "61828450843", "professor, analista"],
            ["SETADES", "17/2016", "66797347091", "engenheiro"]
        ]);
    });

    test("Deve retornar um array vazio para arquivos vazios", () => {
        const emptyFilePath = path.join(__dirname, "empty_test.txt");
        fs.writeFileSync(emptyFilePath, "");
        
        expect(readFileCandidatos(emptyFilePath)).toEqual([]);
        expect(readFileConcursos(emptyFilePath)).toEqual([]);

        fs.unlinkSync(emptyFilePath);
    });

    test("Deve lidar com entradas inválidas corretamente", () => {
        const invalidFilePath = path.join(__dirname, "invalid_test.txt");
        fs.writeFileSync(invalidFilePath, "Texto aleatório sem padrão esperado\nOutro texto");
        
        expect(readFileCandidatos(invalidFilePath)).toEqual([]);
        expect(readFileConcursos(invalidFilePath)).toEqual([]);

        fs.unlinkSync(invalidFilePath);
    });
});
