const express = require("express");
const { processarCandidatos, processarConcursos } = require('../controllers/importarDadosController');


const router = express.Router();
router.post("/concursos", processarConcursos);

router.post("/candidatos", processarCandidatos);


module.exports = router;