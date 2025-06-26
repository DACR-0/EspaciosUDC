import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl, Typography } from "@mui/material";
import { useState } from "react";

const opcionesDocumento = [
  { value: "CC", label: "Cédula de ciudadanía" },
  { value: "TI", label: "Tarjeta de identidad" },
  { value: "CE", label: "Cédula de extranjería" },
  { value: "PS", label: "Pasaporte" },
  { value: "Otro", label: "Otro" },
];

const opcionesCargo = [
  { value: "estudiante", label: "Estudiante" },
  { value: "docente", label: "Docente" },
  { value: "administrativo", label: "Administrativo" },
  { value: "egresado", label: "Egresado" },
];

export default function DatosPersonalesPrestamo({ onSubmit, enviando, onBack }: { onSubmit: (data: any) => void, enviando: boolean, onBack: () => void }) {
  const [nombre, setNombre] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [cargo, setCargo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefonoError, setTelefonoError] = useState(false);

  const entidad = "Universidad de Cartagena";

  const handleTelefonoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Solo permite números
    if (/^\d*$/.test(value)) {
      setTelefono(value);
      setTelefonoError(false);
    } else {
      setTelefonoError(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!telefono || !/^\d+$/.test(telefono)) {
      setTelefonoError(true);
      return;
    }
    onSubmit({
      nombre,
      tipoDocumento,
      identificacion,
      organizacion: entidad,
      cargo,
      telefono,
      correo,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" fontWeight={700} mb={2}>
        Información del solicitante
      </Typography>

      <TextField
        label="Nombre completo del solicitante"
        fullWidth
        margin="normal"
        required
        value={nombre}
        onChange={e => setNombre(e.target.value)}
      />

      <FormControl fullWidth margin="normal" required>
        <InputLabel id="tipo-doc-label">Tipo de documento</InputLabel>
        <Select
          labelId="tipo-doc-label"
          value={tipoDocumento}
          label="Tipo de documento"
          onChange={e => setTipoDocumento(e.target.value)}
        >
          <MenuItem value=""><em>Seleccione...</em></MenuItem>
          {opcionesDocumento.map(opt => (
            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Número de documento"
        fullWidth
        margin="normal"
        required
        value={identificacion}
        onChange={e => setIdentificacion(e.target.value)}
      />

      <TextField
        label="Nombre de la entidad a la que pertenece"
        fullWidth
        margin="normal"
        value={entidad}
        InputProps={{ readOnly: true }}
      />

      <FormControl fullWidth margin="normal" required>
        <InputLabel id="cargo-label">Cargo dentro de la universidad</InputLabel>
        <Select
          labelId="cargo-label"
          value={cargo}
          label="Cargo dentro de la universidad"
          onChange={e => setCargo(e.target.value)}
        >
          <MenuItem value=""><em>Seleccione...</em></MenuItem>
          {opcionesCargo.map(opt => (
            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        label="Teléfono"
        fullWidth
        margin="normal"
        required
        value={telefono}
        onChange={handleTelefonoChange}
        error={telefonoError}
        helperText={telefonoError ? "Solo se permiten números" : ""}
        inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
      />

      <TextField
        label="Correo electrónico"
        type="email"
        fullWidth
        margin="normal"
        required
        value={correo}
        onChange={e => setCorreo(e.target.value)}
      />

      <Box mt={3} display="flex" justifyContent="center" gap={2}>
        <Button
          variant="outlined"
          color="primary"
          onClick={onBack}
          disabled={enviando}
        >
          Volver
        </Button>
        <Button type="submit" variant="contained" color="primary" disabled={enviando}>
          Finalizar
        </Button>
      </Box>
    </form>
  );
}