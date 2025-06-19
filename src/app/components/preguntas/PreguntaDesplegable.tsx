import { FormControl, InputLabel,FormLabel, Select, MenuItem, Typography, Box } from "@mui/material";

interface OpcionDesplegable {
  value: string;
  label: string;
}

interface PreguntaDesplegableProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: OpcionDesplegable[];
  required?: boolean;
}

export default function PreguntaDesplegable({
  label,
  value,
  onChange,
  options,
  required = false,
}: PreguntaDesplegableProps) {
  return (
    <Box my={2}>
      <FormLabel>{label}</FormLabel>
      <FormControl fullWidth required={required} margin="normal">
        <InputLabel>{label}</InputLabel>
        <Select
          value={value}
          label={label}
          onChange={e => onChange(e.target.value as string)}
        >
          <MenuItem value="">
            <em>Seleccione...</em>
          </MenuItem>
          {options.map(opt => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}