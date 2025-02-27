const { readFileCandidatos } = require("../utils/funcoes");
const Candidato = require("../models/candidatoModel");

const candidatos = readFileCandidatos("candidatos.txt").map(
    ([nome, dataNascimento, cpf, profissoes]) => new Candidato(nome, dataNascimento, cpf, profissoes)
);

const buscarConcursosPorCPF = (cpf, concursos) => {
    const candidato = candidatos.find(c => c.cpf === cpf);

    if (!candidato) return [];

    const resultado = concursos.filter(concurso =>
        concurso.vagas.some(vaga => candidato.profissoes.includes(vaga)));
    
    return resultado;
};

module.exports = { buscarConcursosPorCPF, candidatos };
