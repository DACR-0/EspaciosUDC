// components/preguntas/PreguntaSiNoArchivo.tsx
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, Typography, Box } from "@mui/material";

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
        <Box mt={1} display="flex" alignItems="center" gap={2}>
          <Button
            variant={file ? "contained" : "outlined"}
            color={file ? "success" : "primary"}
            component="label"
          >
            {file ? "Archivo seleccionado" : "Subir archivo"}
            <input type="file" hidden onChange={onFileChange} />
          </Button>
          {file && (
            <Typography variant="body2" color="success.main">
              {file.name}
            </Typography>
          )}
        </Box>
      )}
    </FormControl>
  );
}