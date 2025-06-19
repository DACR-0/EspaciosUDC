// components/preguntas/PreguntaFechaHora.tsx
import { Box, Typography,FormLabel, TextField } from "@mui/material";

interface FechaHoraValue {
  fechaInicio: string;
  fechaFin: string;
  horaInicio: string;
  horaFin: string;
}

interface PreguntaFechaHoraProps {
  label: string;
  value: FechaHoraValue;
  onChange: (value: FechaHoraValue) => void;
}

export default function PreguntaFechaHora({
  label,
  value,
  onChange,
}: PreguntaFechaHoraProps) {
  return (
    <Box my={2}>
      <FormLabel>{label}</FormLabel>

      <Box mt={2} display="flex" gap={2} alignItems="center">
        <TextField
          label="Fecha inicio"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={value.fechaInicio}
          onChange={e => onChange({ ...value, fechaInicio: e.target.value })}
        />
        <TextField
          label="Fecha fin"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={value.fechaFin}
          onChange={e => onChange({ ...value, fechaFin: e.target.value })}
        />
      </Box>
      <Box display="flex" gap={2} alignItems="center" mt={2}>
        <TextField
          label="Hora inicio"
          type="time"
          InputLabelProps={{ shrink: true }}
          value={value.horaInicio}
          onChange={e => onChange({ ...value, horaInicio: e.target.value })}
        />
        <TextField
          label="Hora fin"
          type="time"
          InputLabelProps={{ shrink: true }}
          value={value.horaFin}
          onChange={e => onChange({ ...value, horaFin: e.target.value })}
        />
      </Box>
    </Box>
  );
}