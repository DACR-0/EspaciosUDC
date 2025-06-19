// components/preguntas/PreguntaOpcionMultiple.tsx
import { FormControl, FormLabel, FormGroup, FormControlLabel, Checkbox } from "@mui/material";

interface Option {
  value: string;
  label: string;
}

interface PreguntaOpcionMultipleProps {
  label: string;
  options: Option[];
  value: string[];
  onChange: (value: string[]) => void;
}

export default function PreguntaOpcionMultiple({
  label,
  options,
  value,
  onChange,
}: PreguntaOpcionMultipleProps) {
  const handleCheck = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v: string) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  return (
    <FormControl component="fieldset" margin="normal">
      <FormLabel>{label}</FormLabel>
      <FormGroup>
        {options.map((opt: Option) => (
          <FormControlLabel
            key={opt.value}
            control={
              <Checkbox
                checked={value.includes(opt.value)}
                onChange={() => handleCheck(opt.value)}
              />
            }
            label={opt.label}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}