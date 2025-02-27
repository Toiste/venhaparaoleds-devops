const pool = require("../config/database");

async function buscarCandidatosPorConcurso(codigo) {
    const query = `
         SELECT DISTINCT c.nome, TO_CHAR(c.nascimento, 'DD/MM/YYYY') AS nascimento, c.cpf 
        FROM candidatos c
        JOIN candidatos_profissoes cp ON c.id = cp.candidato_id
        JOIN profissoes p ON cp.profissao_id = p.id
        JOIN concursos_vagas cv ON p.id = cv.profissao_id
        JOIN concursos con ON cv.concurso_id = con.id
        WHERE con.codigo = $1;
    `;
    const { rows } = await pool.query(query, [codigo]);
    return rows;
}

module.exports = { buscarCandidatosPorConcurso };
