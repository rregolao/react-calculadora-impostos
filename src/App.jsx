import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import TaxForm from "./components/TaxForm";
import TaxReport from "./components/TaxReport";

// Faixas de imposto progressivas: cada faixa tributa apenas a parcela da
// renda que excede o limite anterior, evitando o "efeito degrau" em que um
// pequeno aumento de renda ultrapassa uma faixa e aumenta o imposto sobre o
// valor total (e não apenas sobre o excedente).
const FAIXAS_IMPOSTO = [
  { limite: 10000, aliquota: 0.05 },
  { limite: 20000, aliquota: 0.1 },
  { limite: Infinity, aliquota: 0.15 },
];

const calcularImpostoProgressivo = (income) => {
  let tax = 0;
  let limiteAnterior = 0;

  for (const { limite, aliquota } of FAIXAS_IMPOSTO) {
    if (income <= limiteAnterior) break;
    const baseTributavel = Math.min(income, limite) - limiteAnterior;
    tax += baseTributavel * aliquota;
    limiteAnterior = limite;
  }

  return tax;
};

const App = () => {
  const [taxData, setTaxData] = useState(null);

  const calculateTax = (values) => {
    const income = parseFloat(values.income);
    const tax = calcularImpostoProgressivo(income);

    const taxData = {
      ...values,
      tax,
    };

    setTaxData(taxData);
  };

  return (
    <Container style={{ maxWidth: "800px", margin: "0 auto" }}>
      <Typography variant="h3" align="center" style={{ marginBottom: "16px" }}>
        Calculadora de Impostos
      </Typography>
      <TaxForm onSubmit={calculateTax} />
      {taxData && <TaxReport taxData={taxData} />}
    </Container>
  );
};

export default App;
