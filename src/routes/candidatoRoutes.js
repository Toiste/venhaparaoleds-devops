const express = require("express");
const { getConcursosPorCPF } = require("../controllers/candidatoFileController");
const { getConcursosPorCPFBD } = require("../controllers/candidato_BD_Controller");

const router = express.Router();
router.get("/:cpf", getConcursosPorCPF);
router.get("/bd/:cpf", getConcursosPorCPFBD);

module.exports = router;
