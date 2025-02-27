const { buscarCandidatosPorConcurso } = require("../services/concursoFile");
const { candidatos } = require("../services/candidatoFile");

const getCandidatosPorConcurso = (req, res) => {
    const { codigo } = req.params;
    const resultado = buscarCandidatosPorConcurso(codigo, candidatos);
    res.json(resultado);
};

module.exports = { getCandidatosPorConcurso };
