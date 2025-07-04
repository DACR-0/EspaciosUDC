// components/preguntas/PreguntaAbierta.tsx
import { TextField,FormLabel, Typography, Box } from "@mui/material";

interface PreguntaAbiertaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const MAX_LENGTH = 255;

export default function PreguntaAbierta({
  label,
  value,
  onChange,
  required = false,
}: PreguntaAbiertaProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= MAX_LENGTH) {
      onChange(e.target.value);
    }
  };

  return (
    <Box my={2}>
      <FormLabel>{label}</FormLabel>
      <TextField
        value={value}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required={required}
        multiline
        minRows={3}
        inputProps={{ maxLength: MAX_LENGTH }}
        placeholder="Escribe tu respuesta aquí..."
      />
      <Box display="flex" justifyContent="flex-end">
        <Typography variant="caption" color={value.length === MAX_LENGTH ? "error" : "text.secondary"}>
          {value.length}/{MAX_LENGTH} caracteres
        </Typography>
      </Box>
    </Box>
  );
}