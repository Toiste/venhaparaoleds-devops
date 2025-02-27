const { buscarConcursosPorCPF } = require("../services/candidatoBD");

async function getConcursosPorCPFBD(req, res) {
    const { cpf } = req.params;
    try {
        const concursos = await buscarConcursosPorCPF(cpf);
        if (concursos.length === 0) {
            return res.status(404).json({ mensagem: "Nenhum concurso encontrado para esse CPF" });
        }
        res.json(concursos);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}

module.exports = { getConcursosPorCPFBD };
