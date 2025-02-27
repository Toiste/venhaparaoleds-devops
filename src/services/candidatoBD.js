const pool = require("../config/database");

async function buscarConcursosPorCPF(cpf) {
    const query = `
          SELECT con.orgao, con.edital, con.codigo, 
               ARRAY_AGG(DISTINCT p_todas.nome) AS vagas
        FROM concursos con
        JOIN concursos_vagas cv ON con.id = cv.concurso_id
        JOIN profissoes p_todas ON cv.profissao_id = p_todas.id
        WHERE con.id IN (
            SELECT con.id
            FROM candidatos c
            JOIN candidatos_profissoes cp ON c.id = cp.candidato_id
            JOIN profissoes p ON cp.profissao_id = p.id
            JOIN concursos_vagas cv ON p.id = cv.profissao_id
            JOIN concursos con ON cv.concurso_id = con.id
            WHERE c.cpf = $1
        )
        GROUP BY con.orgao, con.edital, con.codigo;
    `;
    const { rows } = await pool.query(query, [cpf]);
    return rows;
}

module.exports = { buscarConcursosPorCPF };
