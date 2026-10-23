
const express = require("express");
const path = require("path");
const { simular } = require("./calculos");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/simular", (req, res) => {
  const aparelhos = req.body?.aparelhos;

  if (!Array.isArray(aparelhos) || aparelhos.length === 0) {
    return res.status(400).json({
      erro: "Adicione pelo menos um aparelho."
    });
  }

  for (let i = 0; i < aparelhos.length; i++) {
    const a = aparelhos[i];
    const numero = i + 1;

    if (typeof a.nome !== "string" || !a.nome.trim()) {
      return res.status(400).json({
        erro: `nome inválido (aparelho ${numero})`
      });
    }

    if (typeof a.potenciaW !== "number" ||
        !Number.isFinite(a.potenciaW) ||
        a.potenciaW < 1 || a.potenciaW > 10000) {
      return res.status(400).json({
        erro: `potenciaW deve estar entre 1 e 10000 (aparelho ${numero})`
      });
    }

    if (typeof a.horasDia !== "number" ||
        !Number.isFinite(a.horasDia) ||
        a.horasDia < 0 || a.horasDia > 24) {
      return res.status(400).json({
        erro: `horasDia deve estar entre 0 e 24 (aparelho ${numero})`
      });
    }

    if (typeof a.diasMes !== "number" ||
        !Number.isInteger(a.diasMes) ||
        a.diasMes < 1 || a.diasMes > 31) {
      return res.status(400).json({
        erro: `diasMes deve ser inteiro entre 1 e 31 (aparelho ${numero})`
      });
    }
  }

  res.json(simular(aparelhos));
});

app.listen(3000, () => {
  console.log("Medidor Coopera em http://localhost:3000");
});
