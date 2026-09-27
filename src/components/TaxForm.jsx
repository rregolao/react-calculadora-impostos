import React from "react";
import { useFormik } from "formik";
import { TextField, Button, Container } from "@mui/material";

const TaxForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      income: "",
    },
    validate: (values) => {
      const errors = {};

      if (!values.name) {
        errors.name = "O campo Nome é obrigatório";
      }

      if (!values.age) {
        errors.age = "O campo Idade é obrigatório";
      } else if (isNaN(values.age) || Number(values.age) < 0) {
        errors.age = "Informe uma idade válida (número maior ou igual a zero)";
      }

      if (!values.income) {
        errors.income = "O campo Renda é obrigatório";
      } else if (isNaN(values.income) || Number(values.income) < 0) {
        errors.income = "Informe uma renda válida (número maior ou igual a zero)";
      }

      return errors;
    },
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          label="Nome"
          name="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          helperText={formik.errors.name}
          error={Boolean(formik.errors.name)}
          style={{ marginBottom: "16px" }}
        />
        <TextField
          fullWidth
          label="Idade"
          name="age"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.age}
          helperText={formik.errors.age}
          error={Boolean(formik.errors.age)}
          style={{ marginBottom: "16px" }}
        />
        <TextField
          fullWidth
          label="Renda"
          name="income"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.income}
          helperText={formik.errors.income}
          error={Boolean(formik.errors.income)}
          style={{ marginBottom: "16px" }}
        />
        <Button type="submit" variant="contained" color="primary">
          Calcular
        </Button>
      </form>
    </Container>
  );
};

export default TaxForm;
