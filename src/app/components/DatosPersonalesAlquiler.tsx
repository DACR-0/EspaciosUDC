import { TextField, Button, Box } from "@mui/material";
import { useState } from "react";

export default function DatosPersonalesAlquiler({ onSubmit, enviando, onBack }: { onSubmit: (data: any) => void, enviando: boolean, onBack: () => void }) {
  const [nombre, setNombre] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [organizacion, setOrganizacion] = useState("");
  const [cargo, setCargo] = useState("");
  const [correo, setCorreo] = useState("");

  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit({ nombre, identificacion, organizacion, cargo, correo }); }}>
      <TextField label="Nombre completo" fullWidth margin="normal" required value={nombre} onChange={e => setNombre(e.target.value)} />
      <TextField label="Identificación" fullWidth margin="normal" required value={identificacion} onChange={e => setIdentificacion(e.target.value)} />
      <TextField label="Organización/Universidad" fullWidth margin="normal" required value={organizacion} onChange={e => setOrganizacion(e.target.value)} />
      <TextField label="Cargo" fullWidth margin="normal" required value={cargo} onChange={e => setCargo(e.target.value)} />
      <TextField label="Correo electrónico" type="email" fullWidth margin="normal" required value={correo} onChange={e => setCorreo(e.target.value)} />
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