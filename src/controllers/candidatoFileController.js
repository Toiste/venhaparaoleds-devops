const { buscarConcursosPorCPF } = require("../services/candidatoFile");
const { concursos } = require("../services/concursoFile");

const getConcursosPorCPF = (req, res) => {
    const { cpf } = req.params;
    const resultado = buscarConcursosPorCPF(cpf, concursos);
    res.json(resultado);
};

module.exports = { getConcursosPorCPF };
