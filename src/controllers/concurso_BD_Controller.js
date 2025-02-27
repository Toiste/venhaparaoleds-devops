const { buscarCandidatosPorConcurso } = require("../services/concursoBD");

async function getCandidatosPorConcursoBD(req, res) {
    const { codigo } = req.params;
    try {
        const candidatos = await buscarCandidatosPorConcurso(codigo);
        if (candidatos.length === 0) {
            return res.status(404).json({ mensagem: "Nenhum candidato encontrado para esse concurso" });
        }
        res.json(candidatos);
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
}

module.exports = { getCandidatosPorConcursoBD };
