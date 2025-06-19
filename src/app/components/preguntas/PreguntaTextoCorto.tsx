import { TextField, Typography, Box, FormLabel } from "@mui/material";

interface PreguntaTextoCortoProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string; // Para usar "email", "text", etc.
}

const MAX_LENGTH = 120;

export default function PreguntaTextoCorto({
  label,
  value,
  onChange,
  required = false,
  type = "text",
}: PreguntaTextoCortoProps) {
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
        inputProps={{ maxLength: MAX_LENGTH }}
        type={type}
      />
    </Box>
  );
}