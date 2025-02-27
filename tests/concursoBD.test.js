const { buscarCandidatosPorConcurso } = require("../src/services/concursoBD");
const pool = require("../src/config/database");

jest.mock("../src/config/database", () => ({
    query: jest.fn(),
}));

describe("Serviço de Concurso - buscarCandidatosPorConcurso", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Deve retornar candidatos aptos para um concurso específico", async () => {
        const codigoConcurso = "123456";

        // Simula os dados retornados pelo banco
        const mockResultado = {
            rows: [
                { nome: "João Silva", nascimento: "15/04/1985", cpf: "123.456.789-00" },
                { nome: "Maria Oliveira", nascimento: "22/08/1990", cpf: "987.654.321-00" }
            ],
        };

        pool.query.mockResolvedValue(mockResultado);

        const resultado = await buscarCandidatosPorConcurso(codigoConcurso);

        // Verificações
        expect(pool.query).toHaveBeenCalledTimes(1);
        expect(pool.query).toHaveBeenCalledWith(expect.any(String), [codigoConcurso]);
        expect(resultado).toEqual(mockResultado.rows);
    });

    it("Deve retornar um array vazio quando não houver candidatos aptos", async () => {
        const codigoConcurso = "999999";

        pool.query.mockResolvedValue({ rows: [] });

        const resultado = await buscarCandidatosPorConcurso(codigoConcurso);

        expect(pool.query).toHaveBeenCalledTimes(1);
        expect(resultado).toEqual([]);
    });

    it("Deve lançar erro se a consulta falhar", async () => {
        const codigoConcurso = "123456";
        pool.query.mockRejectedValue(new Error("Erro no banco de dados"));

        await expect(buscarCandidatosPorConcurso(codigoConcurso)).rejects.toThrow("Erro no banco de dados");
    });
});
