const path = require('path');
const pool = require('../config/database');
const { readFileCandidatos, readFileConcursos } = require('../utils/funcoes');
const {formatarData } = require('../utils/funcoes');



const importarCandidatos = async () => {
    const filePath = path.join(__dirname, '../../candidatos.txt');
    const candidatos = readFileCandidatos(filePath);

    for (let [nome, nascimento, cpf, profissoesStr] of candidatos) {
        nascimento = formatarData(nascimento);

        const profissoes = profissoesStr.split(',').map(p => p.trim());

        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            // 1️⃣ Insere o candidato
            const candidatoQuery = `INSERT INTO candidatos (nome, nascimento, cpf) VALUES ($1, $2, $3) RETURNING id;`;
            const { rows } = await client.query(candidatoQuery, [nome, nascimento, cpf]);
            const candidatoId = rows[0].id;

            // 2️⃣ Insere profissões e relaciona com o candidato
            for (let profissaoNome of profissoes) {
                let profissaoQuery = `SELECT id FROM profissoes WHERE nome = $1;`;
                let profissaoRes = await client.query(profissaoQuery, [profissaoNome]);

                let profissaoId;
                if (profissaoRes.rowCount === 0) {
                    let insertProfissaoQuery = `INSERT INTO profissoes (nome) VALUES ($1) RETURNING id;`;
                    let insertRes = await client.query(insertProfissaoQuery, [profissaoNome]);
                    profissaoId = insertRes.rows[0].id;
                } else {
                    profissaoId = profissaoRes.rows[0].id;
                }

                let relacaoQuery = `INSERT INTO candidatos_profissoes (candidato_id, profissao_id) VALUES ($1, $2);`;
                await client.query(relacaoQuery, [candidatoId, profissaoId]);
            }

            await client.query('COMMIT');
            console.log(`✅ Candidato ${nome} importado.`);
        } catch (error) {
            await client.query('ROLLBACK');
            console.error(`❌ Erro ao importar candidato ${nome}:`, error.message);
        } finally {
            client.release();
        }
    }
};

const importarConcursos = async () => {
    const filePath = path.join(__dirname, '../../concursos.txt');
    const concursos = readFileConcursos(filePath);

    for (let [orgao, edital, codigo, vagasStr] of concursos) {
        const vagas = vagasStr.split(',').map(v => v.trim());

        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            // 1️⃣ Insere o concurso
            const concursoQuery = `INSERT INTO concursos (orgao, edital, codigo) VALUES ($1, $2, $3) RETURNING id;`;
            const { rows } = await client.query(concursoQuery, [orgao, edital, codigo]);
            const concursoId = rows[0].id;

            if (!rows || rows.length === 0) {
                throw new Error(`Erro ao inserir concurso ${codigo}. Nenhuma linha retornada.`);
            }

            // 2️⃣ Insere vagas associadas ao concurso
            for (let vagaNome of vagas) {
                let profissaoQuery = `SELECT id FROM profissoes WHERE nome = $1;`;
                let profissaoRes = await client.query(profissaoQuery, [vagaNome]);

                let profissaoId;
                if (profissaoRes.rowCount === 0) {
                    let insertProfissaoQuery = `INSERT INTO profissoes (nome) VALUES ($1) RETURNING id;`;
                    let insertRes = await client.query(insertProfissaoQuery, [vagaNome]);
                    profissaoId = insertRes.rows[0].id;
                } else {
                    profissaoId = profissaoRes.rows[0].id;
                }

                let vagaQuery = `INSERT INTO concursos_vagas (concurso_id, profissao_id) VALUES ($1, $2);`;
                await client.query(vagaQuery, [concursoId, profissaoId]);
            }

            await client.query('COMMIT');
            console.log(`✅ Concurso ${codigo} importado.`);
        } catch (error) {
            await client.query('ROLLBACK');
            console.error(`❌ Erro ao importar concurso ${codigo}:`, error.message);
        } finally {
            client.release();
        }
    }
};

module.exports = { importarCandidatos, importarConcursos };
