import { TextField, Typography, FormLabel, Box } from "@mui/material";

interface PreguntaTelefonoProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  maxLength?: number;
}

export default function PreguntaTelefono({
  label,
  value,
  onChange,
  required = false,
  maxLength = 15, // Puedes ajustar el máximo según tu país
}: PreguntaTelefonoProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Solo permite números y no más de maxLength caracteres
    const val = e.target.value.replace(/\D/g, "");
    if (val.length <= maxLength) {
      onChange(val);
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
        inputProps={{ maxLength, inputMode: "numeric", pattern: "[0-9]*" }}
        type="tel"
        placeholder="Ej: 3001234567"
      />
    </Box>
  );
}