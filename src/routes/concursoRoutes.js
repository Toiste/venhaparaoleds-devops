const express = require("express");
const { getCandidatosPorConcurso } = require("../controllers/concursoFileController");
const { getCandidatosPorConcursoBD } = require("../controllers/concurso_BD_Controller");

const router = express.Router();
router.get("/:codigo", getCandidatosPorConcurso);

router.get("/bd/:codigo", getCandidatosPorConcursoBD);

module.exports = router;
