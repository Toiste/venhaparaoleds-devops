class Candidato {
    constructor(nome, dataNascimento, cpf, profissoes) {
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.cpf = cpf;
        this.profissoes = Array.isArray(profissoes) ? profissoes : profissoes.split(", ").map(p => p.trim());
    }
}

module.exports = Candidato;
