// components/preguntas/PreguntaFechaHora.tsx
import { TextField, Box } from "@mui/material";

interface FechaHoraValue {
  fechaInicio: string;
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
    <Box display="flex" gap={2} alignItems="center" marginY={2}>
      <TextField
        label={`${label} (Fecha inicio)`}
        type="date"
        InputLabelProps={{ shrink: true }}
        value={value.fechaInicio}
        onChange={e => onChange({ ...value, fechaInicio: e.target.value })}
      />
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
  );
}