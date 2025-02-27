const { buscarConcursosPorCPF } = require("../src/services/candidatoFile");

jest.mock("../src/utils/funcoes", () => ({
    readFileCandidatos: jest.fn(() => [
        ["João Silva", "15/04/1985", "123.456.789-00", "Professor de Matemática"],
        ["Maria Oliveira", "22/08/1990", "987.654.321-00", "Analista de Sistemas"],
        ["Carlos Souza", "10/10/1980", "555.555.555-55", "Professor de Matemática, Analista de Sistemas"] // Adicionado ao mock
    ])
}));

describe("Teste de buscarConcursosPorCPF", () => {
    const concursosMock = [
        { orgao: "SEDU", edital: "9/2016", codigo: "61828450843", vagas: ["Carpinteiro", "Analista de Sistemas"] },
        { orgao: "PRODEST", edital: "19/2016", codigo: "80937915862", vagas: ["Professor de Matemática"] }
    ];

    it("Deve retornar os concursos para um CPF válido", () => {
        const resultado = buscarConcursosPorCPF("123.456.789-00", concursosMock);
        expect(resultado).toEqual([
            { orgao: "PRODEST", edital: "19/2016", codigo: "80937915862", vagas: ["Professor de Matemática"] }
        ]);
    });

    it("Deve retornar um array vazio para um CPF sem concursos compatíveis", () => {
        const resultado = buscarConcursosPorCPF("000.000.000-00", concursosMock);
        expect(resultado).toEqual([]);
    });

    it("Deve retornar todos os concursos compatíveis para um candidato com múltiplas profissões", () => {
        const resultado = buscarConcursosPorCPF("555.555.555-55", concursosMock);
        expect(resultado).toEqual([
            { orgao: "SEDU", edital: "9/2016", codigo: "61828450843", vagas: ["Carpinteiro", "Analista de Sistemas"] },
            { orgao: "PRODEST", edital: "19/2016", codigo: "80937915862", vagas: ["Professor de Matemática"] }
        ]);
    });
});
