class Concurso {
    constructor(orgao, edital, codigo, vagas) {
        this.orgao = orgao;
        this.edital = edital;
        this.codigo = codigo;
        this.vagas = vagas.split(", ").map(v => v.trim());
    }
}

module.exports = Concurso;
