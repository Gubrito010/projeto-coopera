# Medidor Coopera

Projeto de simulador residencial de consumo de energia com HTML, CSS, JavaScript puro, Node.js e Express.

## Como executar

1. Instale o Node.js LTS.
2. Abra o terminal nesta pasta.
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor:
   ```bash
   npm start
   ```
5. Abra http://localhost:3000 no navegador.

Os cálculos são realizados no servidor, na rota `POST /api/simular`. O front-end usa `fetch`, DOM, `createElement` e `textContent`.

## Parâmetros configurados

O `config.js` contém os parâmetros fornecidos para o número de chamada 6:
- Tarifa: R$ 0,890/kWh
- Bandeira: vermelha1
- HSP: 4,25
- Potência do painel: 400 W

## Teste rápido da API

Envie um `POST` para `http://localhost:3000/api/simular` com `Content-Type: application/json` e o corpo:

```json
{
  "aparelhos": [
    { "nome": "Geladeira", "potenciaW": 150, "horasDia": 24, "diasMes": 30 },
    { "nome": "Chuveiro", "potenciaW": 5500, "horasDia": 0.5, "diasMes": 30 },
    { "nome": "TV", "potenciaW": 100, "horasDia": 5, "diasMes": 30 }
  ]
}
```

Observação: para reproduzir o caso oficial da atividade, altere temporariamente os valores em `config.js` para tarifa `0.80`, bandeira `amarela`, HSP `4.5` e painel `450`.
