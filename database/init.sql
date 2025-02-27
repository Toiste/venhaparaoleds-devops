-- Arquivo para criação das tabelas do modelo Relacional do banco de Dados.

-- Criando as tabelas principais

CREATE TABLE IF NOT EXISTS candidatos (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    nascimento DATE NOT NULL,
    cpf VARCHAR(14) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS profissoes (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS concursos (
    id SERIAL PRIMARY KEY,
    orgao VARCHAR(255) NOT NULL,
    edital VARCHAR(20) NOT NULL,
    codigo VARCHAR(20) UNIQUE NOT NULL
);

-- Tabela intermediária entre candidatos e profissões
CREATE TABLE IF NOT EXISTS candidatos_profissoes (
    candidato_id INT REFERENCES candidatos(id) ON DELETE CASCADE,
    profissao_id INT REFERENCES profissoes(id) ON DELETE CASCADE,
    PRIMARY KEY (candidato_id, profissao_id)
);

-- Tabela intermediária entre concursos e profissões (definindo vagas)
CREATE TABLE IF NOT EXISTS concursos_vagas (
    concurso_id INT REFERENCES concursos(id) ON DELETE CASCADE,
    profissao_id INT REFERENCES profissoes(id) ON DELETE CASCADE,
    PRIMARY KEY (concurso_id, profissao_id)
);

-- Indexando CPF e Código do Concurso para melhorar performance nas consultas.
-- facilitando o desenvolvimento de funcionalidades futuras.
CREATE INDEX IF NOT EXISTS idx_candidatos_cpf ON candidatos(cpf);
CREATE INDEX IF NOT EXISTS idx_concursos_codigo ON concursos(codigo);
