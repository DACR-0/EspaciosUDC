// components/preguntas/PreguntaAbierta.tsx
import { TextField } from "@mui/material";

interface PreguntaAbiertaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export default function PreguntaAbierta({
  label,
  value,
  onChange,
  required = false,
}: PreguntaAbiertaProps) {
  return (
    <TextField
      label={label}
      value={value}
      onChange={e => onChange(e.target.value)}
      fullWidth
      margin="normal"
      required={required}
    />
  );
}