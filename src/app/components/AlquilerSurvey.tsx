import { TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";

type Props = {
  form: {
    dias?: string;
    factura?: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (e: SelectChangeEvent) => void;
};

export default function AlquilerSurvey({ form, onInputChange, onSelectChange }: Props) {
  return (
    <>
      <TextField
        margin="normal"
        fullWidth
        label="¿Por cuántos días desea alquilar?"
        type="number"
        name="dias"
        value={form.dias || ""}
        onChange={onInputChange}
        required
        inputProps={{ min: 1 }}
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="factura-label">¿Necesita factura?</InputLabel>
        <Select
          labelId="factura-label"
          name="factura"
          value={form.factura || ""}
          label="¿Necesita factura?"
          onChange={onSelectChange}
          required
        >
          <MenuItem value="">
            <em>Seleccione...</em>
          </MenuItem>
          <MenuItem value="si">Sí</MenuItem>
          <MenuItem value="no">No</MenuItem>
        </Select>
      </FormControl>
    </>
  );
}