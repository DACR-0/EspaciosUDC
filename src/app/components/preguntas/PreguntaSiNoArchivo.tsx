// components/preguntas/PreguntaSiNoArchivo.tsx
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from "@mui/material";

interface PreguntaSiNoArchivoProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  file?: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function PreguntaSiNoArchivo({
  label,
  value,
  onChange,
  file,
  onFileChange,
}: PreguntaSiNoArchivoProps) {
  return (
    <FormControl component="fieldset" margin="normal">
      <FormLabel>{label}</FormLabel>
      <RadioGroup row value={value} onChange={e => onChange(e.target.value)}>
        <FormControlLabel value="si" control={<Radio />} label="Sí" />
        <FormControlLabel value="no" control={<Radio />} label="No" />
      </RadioGroup>
      {value === "si" && (
        <Button variant="outlined" component="label" sx={{ mt: 1 }}>
          Subir archivo
          <input type="file" hidden onChange={onFileChange} />
        </Button>
      )}
    </FormControl>
  );
}