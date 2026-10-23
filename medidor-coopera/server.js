const express = require("express");
const { simular } = require("./calculos");

const app = express();

// Permite receber dados no formato JSON
app.use(express.json());

// Disponibiliza os arquivos HTML, CSS e JS da pasta public
app.use(express.static("public"));

// Rota para simular o consumo de energia
app.post("/api/simular", (req, res) => {
  const aparelhos = req.body?.aparelhos;

  // Verifica se a lista existe e não está vazia
  if (!Array.isArray(aparelhos) || aparelhos.length === 0) {
    return res.status(400).json({
      erro: "A lista de aparelhos não pode estar vazia.",
    });
  }

  // Valida cada aparelho recebido
  for (let i = 0; i < aparelhos.length; i++) {
    const aparelho = aparelhos[i];
    const numero = i + 1;

    // Verifica se o aparelho é um objeto válido
    if (
      aparelho === null ||
      typeof aparelho !== "object" ||
      Array.isArray(aparelho)
    ) {
      return res.status(400).json({
        erro: `Aparelho ${numero} deve ser um objeto válido.`,
      });
    }

    // Verifica o nome
    if (typeof aparelho.nome !== "string" || aparelho.nome.trim() === "") {
      return res.status(400).json({
        erro: `nome deve conter texto (aparelho ${numero})`,
      });
    }

    // Verifica a potência
    if (
      typeof aparelho.potenciaW !== "number" ||
      !Number.isFinite(aparelho.potenciaW) ||
      aparelho.potenciaW < 1 ||
      aparelho.potenciaW > 10000
    ) {
      return res.status(400).json({
        erro: `potenciaW deve estar entre 1 e 10000 (aparelho ${numero})`,
      });
    }

    // Verifica as horas de uso por dia
    if (
      typeof aparelho.horasDia !== "number" ||
      !Number.isFinite(aparelho.horasDia) ||
      aparelho.horasDia < 0 ||
      aparelho.horasDia > 24
    ) {
      return res.status(400).json({
        erro: `horasDia deve estar entre 0 e 24 (aparelho ${numero})`,
      });
    }

    // Verifica os dias de uso no mês
    if (
      typeof aparelho.diasMes !== "number" ||
      !Number.isInteger(aparelho.diasMes) ||
      aparelho.diasMes < 1 ||
      aparelho.diasMes > 31
    ) {
      return res.status(400).json({
        erro: `diasMes deve ser um inteiro entre 1 e 31 (aparelho ${numero})`,
      });
    }
  }

  // Calcula os resultados e devolve a resposta
  try {
    const resultado = simular(aparelhos);
    return res.status(200).json(resultado);
  } catch (erro) {
    console.error("Erro ao simular consumo:", erro);

    return res.status(500).json({
      erro: "Ocorreu um erro interno ao calcular o consumo.",
    });
  }
});

// Inicia o servidor na porta 3000
app.listen(3000, () => {
  console.log("Medidor Coopera em http://localhost:3000");
});
