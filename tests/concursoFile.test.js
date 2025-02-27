const { buscarCandidatosPorConcurso } = require("../src/services/concursoFile");
const Concurso = require("../src/models/concursoModel");

jest.mock("../src/utils/funcoes", () => ({
    readFileConcursos: jest.fn(() => [
        ["SEDU", "9/2016", "61828450843", "Carpinteiro, Analista de Sistemas"],
        ["PRODEST", "19/2016", "80937915862", "Professor de Matemática"]
    ])
}));

describe("Teste de buscarCandidatosPorConcurso", () => {
    const candidatosMock = [
        { nome: "João Silva", nascimento: "15/04/1985", cpf: "123.456.789-00", profissoes: ["Professor de Matemática"] },
        { nome: "Maria Oliveira", nascimento: "22/08/1990", cpf: "987.654.321-00", profissoes: ["Analista de Sistemas"] },
        { nome: "Carlos Souza", nascimento: "10/10/1980", cpf: "555.555.555-55", profissoes: ["Carpinteiro", "Analista de Sistemas"] }
    ];

    it("Deve retornar os candidatos aptos para um concurso válido", () => {
        const resultado = buscarCandidatosPorConcurso("61828450843", candidatosMock);
        expect(resultado).toEqual([
            { nome: "Maria Oliveira", nascimento: "22/08/1990", cpf: "987.654.321-00", profissoes: ["Analista de Sistemas"] },
            { nome: "Carlos Souza", nascimento: "10/10/1980", cpf: "555.555.555-55", profissoes: ["Carpinteiro", "Analista de Sistemas"] }
        ]);
    });

    it("Deve retornar um array vazio para um código de concurso inválido", () => {
        const resultado = buscarCandidatosPorConcurso("00000000000", candidatosMock);
        expect(resultado).toEqual([]);
    });

    it("Deve retornar apenas candidatos aptos de acordo com as profissões exigidas pelo concurso", () => {
        const resultado = buscarCandidatosPorConcurso("80937915862", candidatosMock);
        expect(resultado).toEqual([
            { nome: "João Silva", nascimento: "15/04/1985", cpf: "123.456.789-00", profissoes: ["Professor de Matemática"] }
        ]);
    });
});
