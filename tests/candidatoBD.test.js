const { buscarConcursosPorCPF } = require("../src/services/candidatoBD");
const pool = require("../src/config/database");

jest.mock("../src/config/database", () => ({
    query: jest.fn(),
}));

describe("Teste do serviço buscarConcursosPorCPF", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Deve retornar os concursos associados ao CPF fornecido", async () => {
        const cpf = "123.456.789-00";

        // Simulando o resultado esperado do banco de dados
        const mockResultado = {
            rows: [
                {
                    orgao: "SEDU",
                    edital: "9/2016",
                    codigo: "61828450843",
                    vagas: ["carpinteiro", "analista de sistemas", "marceneiro"],
                },
                {
                    orgao: "PRODEST",
                    edital: "19/2016",
                    codigo: "80937915862",
                    vagas: ["professor de matemática", "cientista de dados"],
                },
            ],
        };

        pool.query.mockResolvedValue(mockResultado);

        const resultado = await buscarConcursosPorCPF(cpf);

        expect(pool.query).toHaveBeenCalledTimes(1);
        expect(pool.query).toHaveBeenCalledWith(
            expect.stringContaining("SELECT con.orgao, con.edital, con.codigo"), 
            [cpf]
        );

        expect(resultado).toEqual(mockResultado.rows);
    });

    it("Deve retornar uma lista vazia se nenhum concurso for encontrado", async () => {
        const cpf = "000.000.000-00"; // CPF sem concursos associados

        pool.query.mockResolvedValue({ rows: [] });

        const resultado = await buscarConcursosPorCPF(cpf);

        expect(pool.query).toHaveBeenCalledTimes(1);
        expect(resultado).toEqual([]);
    });

    it("Deve lançar um erro caso ocorra falha na query", async () => {
        const cpf = "123.456.789-00";

        pool.query.mockRejectedValue(new Error("Erro na consulta ao banco"));

        await expect(buscarConcursosPorCPF(cpf)).rejects.toThrow("Erro na consulta ao banco");

        expect(pool.query).toHaveBeenCalledTimes(1);
    });
});
