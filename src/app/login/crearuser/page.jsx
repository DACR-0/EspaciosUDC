"use client";
import { useState } from "react";
import { Box, Button, TextField, Typography, Paper, Alert } from "@mui/material";

export default function CrearUsuario() {
  const [form, setForm] = useState({
    correo: "",
    password: "",
    confirmar: "",
  });
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setMensaje("");
  };

  const validarCorreo = (correo) => {
    return /@unicartagena\.edu\.co$/i.test(correo.trim());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMensaje("");
    if (!form.correo || !form.password || !form.confirmar) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (!validarCorreo(form.correo)) {
      setError("El correo debe terminar en @unicartagena.edu.co");
      return;
    }
    if (form.password !== form.confirmar) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // Llamar a la API para crear el usuario
    try {
      const res = await fetch("/api/auth/crearuser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo: form.correo, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error al crear usuario");
        return;
      }
      setMensaje("Usuario creado correctamente.");
      setForm({
        correo: "",
        password: "",
        confirmar: "",
      });
    } catch (err) {
      setError("Error de conexión con el servidor.");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <Paper sx={{ p: 4, minWidth: 350 }}>
        <Typography variant="h5" mb={3} align="center">
          Crear Usuario
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Correo electrónico"
            name="correo"
            type="email"
            value={form.correo}
            onChange={handleChange}
            fullWidth
            margin="normal"
            inputProps={{ style: { textTransform: "lowercase" } }}
          />
          <TextField
            label="Contraseña"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Confirmar contraseña"
            name="confirmar"
            type="password"
            value={form.confirmar}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
          {mensaje && <Alert severity="success" sx={{ mt: 2 }}>{mensaje}</Alert>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
          >
            Crear usuario
          </Button>
        </form>
      </Paper>
    </Box>
  );
}