import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { useState } from "react";

export default function DatosPersonalesPrestamo({ onSubmit, enviando, onBack }: { onSubmit: (data: any) => void, enviando: boolean, onBack: () => void }) {
  const [nombre, setNombre] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [rol, setRol] = useState("");
  const [correo, setCorreo] = useState("");
  const [facultad, setFacultad] = useState("");

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit({ nombre, identificacion, rol, correo, facultad }); }}>
      <TextField label="Nombre completo" fullWidth margin="normal" required value={nombre} onChange={e => setNombre(e.target.value)} />
      <TextField label="Identificación" fullWidth margin="normal" required value={identificacion} onChange={e => setIdentificacion(e.target.value)} />
      <FormControl fullWidth margin="normal" required>
        <InputLabel id="rol-label">Rol</InputLabel>
        <Select labelId="rol-label" value={rol} label="Rol" onChange={e => setRol(e.target.value)}>
          <MenuItem value=""><em>Seleccione...</em></MenuItem>
          <MenuItem value="estudiante">Estudiante</MenuItem>
          <MenuItem value="profesor">Profesor</MenuItem>
          <MenuItem value="administrativo">Administrativo</MenuItem>
        </Select>
      </FormControl>
      <TextField label="Correo institucional" type="email" fullWidth margin="normal" required value={correo} onChange={e => setCorreo(e.target.value)} />
      <TextField label="Facultad/Dependencia" fullWidth margin="normal" required value={facultad} onChange={e => setFacultad(e.target.value)} />
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