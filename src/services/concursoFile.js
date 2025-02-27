const { readFileConcursos } = require("../utils/funcoes");
const Concurso = require("../models/concursoModel");

const concursos = readFileConcursos("concursos.txt").map(
    ([orgao, edital, codigo, vagas]) => new Concurso(orgao, edital, codigo, vagas)
);

const buscarCandidatosPorConcurso = (codigo, candidatos) => {
    return candidatos.filter(candidato =>
        concursos.some(concurso =>
            concurso.codigo === codigo && concurso.vagas.some(vaga => candidato.profissoes.includes(vaga))
        )
    );
};

module.exports = { buscarCandidatosPorConcurso, concursos };
