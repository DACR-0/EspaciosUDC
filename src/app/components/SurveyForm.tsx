"use client";
import { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  Typography,
  Paper,
  InputLabel,
  FormControl,
  Alert,
  Divider,
} from "@mui/material";
import { IconClipboardList } from "@tabler/icons-react";
import type { SelectChangeEvent } from "@mui/material";
import AlquilerSurvey from "./AlquilerSurvey";
import DatosPersonalesAlquiler from "./DatosPersonalesAlquiler";
import DatosPersonalesPrestamo from "./DatosPersonalesPrestamo";

type FormState = {
  dias?: string;
  factura?: string;
  actividad?: string;
  horas?: string;
};

export default function SurveyForm() {
  const [tipo, setTipo] = useState("");
  const [form, setForm] = useState<FormState>({});
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [paso, setPaso] = useState(1);
  const [datosEspacio, setDatosEspacio] = useState<any>(null);

  // Handlers para el formulario de espacio
  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name as keyof FormState;
    setForm({ ...form, [name]: e.target.value });
  };

  const handleTipoChange = (e: SelectChangeEvent) => {
    setTipo(e.target.value);
    setForm({});
  };

  // Paso 1: Guardar datos del espacio y avanzar
  const handleEspacioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDatosEspacio({ tipo, ...form });
    setPaso(2);
  };

  // Paso 2: Guardar datos personales y enviar todo junto
  const handleDatosPersonales = async (datos: any) => {
    setEnviando(true);
    setMensaje("");
    try {
      const res = await fetch("/api/encuesta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...datosEspacio, ...datos }),
      });
      if (res.ok) {
        setMensaje("¡Encuesta enviada correctamente!");
        setPaso(3);
      } else {
        setMensaje("Error al enviar la encuesta.");
      }
    } catch {
      setMensaje("Error de red.");
    }
    setEnviando(false);
  };

  return (
    <Paper
      elevation={10}
      sx={{
        maxWidth: 720,
        mx: "auto",
        p: { xs: 2, sm: 4 },
        mt: 4,
        borderRadius: 5,
        background: "linear-gradient(135deg, #f8fbff 0%, #e3f0ff 100%)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.18)",
        backdropFilter: "blur(2px)",
      }}
    >
      <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
        <Box
          sx={{
            bgcolor: "#1976d2",
            borderRadius: "50%",
            width: 56,
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 1,
            boxShadow: 2,
          }}
        >
          <IconClipboardList size={32} color="#fff" />
        </Box>
        <Typography variant="h4" fontWeight={700} color="primary" gutterBottom>
          Solicitud de Espacio
        </Typography>
        <Typography
          variant="subtitle1"
          color="text.secondary"
          sx={{ textAlign: "center", mb: 2 }}
        >
          Por favor, completa todos los pasos para enviar tu solicitud.
        </Typography>
      </Box>
      <Divider sx={{ mb: 2 }} />

      {/* Paso 1: Solicitud de espacio */}
      {paso === 1 && (
        <form onSubmit={handleEspacioSubmit}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="tipo-label">Tipo de Solicitud</InputLabel>
            <Select
              labelId="tipo-label"
              name="tipo"
              value={tipo}
              label="Tipo de Solicitud"
              onChange={handleTipoChange}
              required
            >
              <MenuItem value="">
                <em>Seleccione...</em>
              </MenuItem>
              <MenuItem value="alquiler">Alquiler</MenuItem>
              <MenuItem value="prestamo">Préstamo</MenuItem>
            </Select>
          </FormControl>

          {tipo && (
            <AlquilerSurvey
              form={form}
              onChange={(field, value) => setForm(prev => ({ ...prev, [field]: value }))}
            />
          )}

          <Box mt={4} display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!tipo || enviando}
              size="large"
              sx={{ px: 5, py: 1.5, fontWeight: 700, borderRadius: 3, boxShadow: 2 }}
            >
              Siguiente
            </Button>
          </Box>
        </form>
      )}

      {/* Paso 2: Datos personales */}
      {paso === 2 && (
        tipo === "alquiler"
          ? <DatosPersonalesAlquiler onSubmit={handleDatosPersonales} enviando={enviando} onBack={() => setPaso(1)} />
          : <DatosPersonalesPrestamo onSubmit={handleDatosPersonales} enviando={enviando} onBack={() => setPaso(1)} />
      )}

      {/* Paso 3: Mensaje final */}
      {paso === 3 && (
        <>
          <Alert severity="success" sx={{ mt: 3, mb: 2 }}>
            ¡Encuesta enviada correctamente!
          </Alert>
          <Box display="flex" justifyContent="center" gap={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setForm({});
                setDatosEspacio(null);
                setTipo("");
                setPaso(1);
                setMensaje("");
              }}
            >
              Hacer otra encuesta
            </Button>
          </Box>
        </>
      )}

      {/* Mensaje de error */}
      {mensaje && paso !== 3 && (
        <Alert severity={mensaje.startsWith("¡Encuesta") ? "success" : "error"} sx={{ mt: 3 }}>
          {mensaje}
        </Alert>
      )}
    </Paper>
  );
}