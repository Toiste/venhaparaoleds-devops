const fs = require("fs");

// Função para leitura do arquivo de Candidatos
const readFileCandidatos = (filePath) => {
    return fs.readFileSync(filePath, "utf8").trim().split("\n").map(line => {
        const parts = line.match(/^([A-Za-zÀ-ÖØ-öø-ÿ]+(?:\s[A-Za-zÀ-ÖØ-öø-ÿ]+)*)\s(\d{2}\/\d{2}\/\d{4})\s(\d{3}\.\d{3}\.\d{3}-\d{2})\s\[(.*?)\]$/);
        if (!parts) return null;
        return parts.slice(1);
    }).filter(Boolean);
};


// Função para leitura do arquivo de Concursos
const readFileConcursos = (filePath) => {
    return fs.readFileSync(filePath, "utf8").trim().split("\n").map(line => {
        const parts = line.match(/^([A-Za-zÀ-ÖØ-öø-ÿ]+)\s(\d{1,2}\/\d{4})\s(\d+)\s\[(.*?)\]$/);
        if (!parts) return null;
        return parts.slice(1);
    }).filter(Boolean);
};


// Formata a data de DD-MM-YYYY para YYYY-MM-DD
const formatarData = (data) => {
    if (!data || !/^\d{2}\/\d{2}\/\d{4}$/.test(data)) {
        throw new Error("Formato de data inválido. Use DD/MM/YYYY.");
    }

    const [dia, mes, ano] = data.split('/');
    return `${ano}-${mes}-${dia}`;
};


module.exports = { readFileCandidatos, readFileConcursos, formatarData };
