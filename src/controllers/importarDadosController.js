const { importarCandidatos, importarConcursos } = require('../services/importarDados');

async function processarCandidatos (req, res){
    try {
        await importarCandidatos();
        res.json({ message: "Importação concluída com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao importar candidatos." });
    }
};

async function processarConcursos (req, res){
    try {
        await importarConcursos();
        res.json({ message: "Importação concluída com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao importar concursos." });
    }
};

module.exports = { processarConcursos, processarCandidatos };
