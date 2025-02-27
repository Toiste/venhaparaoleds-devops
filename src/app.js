const express = require("express");
const cors = require("cors");
const candidatoRoutes = require("./routes/candidatoRoutes");
const concursoRoutes = require("./routes/concursoRoutes");
const importarDadosRoutes = require("./routes/importarDadosRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/concursos", concursoRoutes);
app.use("/api/candidatos", candidatoRoutes);
app.use("/api/importar", importarDadosRoutes)


module.exports = app;
