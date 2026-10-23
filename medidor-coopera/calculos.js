
const cfg = require("./config");

function arredondar(valor) {
  return Math.round(valor * 100) / 100;
}

function consumoMensalKwh(aparelho) {
  return aparelho.potenciaW *
    aparelho.horasDia *
    aparelho.diasMes / 1000;
}

function custoEnergia(kwh) {
  return kwh * cfg.TARIFA_KWH;
}

function adicionalBandeira(kwh) {
  return (kwh / 100) * cfg.VALORES_BANDEIRA[cfg.BANDEIRA];
}

function paineisNecessarios(kwh) {
  const geracao =
    (cfg.POTENCIA_PAINEL_W / 1000) *
    cfg.HSP * 30 * cfg.EFICIENCIA;

  return Math.ceil(kwh / geracao);
}

function simular(aparelhos) {
  const detalhes = aparelhos.map(aparelho => {
    const kwh = consumoMensalKwh(aparelho);

    return {
      nome: aparelho.nome,
      kwhMes: arredondar(kwh),
      custo: arredondar(custoEnergia(kwh)),
      percentual: 0
    };
  });

  const consumoKwhMes = detalhes.reduce(
    (total, item) => total + item.kwhMes, 0
  );

  detalhes.forEach((item, indice) => {
    const kwhOriginal = consumoMensalKwh(aparelhos[indice]);

    item.percentual = consumoKwhMes > 0
      ? arredondar((kwhOriginal / consumoKwhMes) * 100)
      : 0;
  });

  const energia = custoEnergia(consumoKwhMes);
  const adicional = adicionalBandeira(consumoKwhMes);

  const maisCaro = detalhes.reduce((maior, item) =>
    item.custo > maior.custo ? item : maior
  );

  return {
    consumoKwhMes: arredondar(consumoKwhMes),
    custoEnergia: arredondar(energia),
    adicionalBandeira: arredondar(adicional),
    totalMes: arredondar(energia + adicional),
    paineisNecessarios: paineisNecessarios(consumoKwhMes),
    aparelhoMaisCaro: {
      nome: maisCaro.nome,
      custo: maisCaro.custo
    },
    detalhes
  };
}

module.exports = {
  consumoMensalKwh,
  custoEnergia,
  adicionalBandeira,
  paineisNecessarios,
  simular
};
