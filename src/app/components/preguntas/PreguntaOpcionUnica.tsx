// components/preguntas/PreguntaOpcionUnica.tsx
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@mui/material";

interface Option {
  value: string;
  label: string;
}

interface PreguntaOpcionUnicaProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export default function PreguntaOpcionUnica({
  label,
  options,
  value,
  onChange,
  required = false,
}: PreguntaOpcionUnicaProps) {
  return (
    <FormControl component="fieldset" margin="normal" required={required}>
      <FormLabel>{label}</FormLabel>
      <RadioGroup value={value} onChange={e => onChange(e.target.value)}>
        {options.map((opt: Option) => (
          <FormControlLabel key={opt.value} value={opt.value} control={<Radio />} label={opt.label} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}