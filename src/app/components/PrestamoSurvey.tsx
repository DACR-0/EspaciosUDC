import { TextField } from "@mui/material";

type Props = {
  form: {
    actividad?: string;
    horas?: string;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

export default function PrestamoSurvey({ form, onInputChange }: Props) {
  return (
    <>
      <TextField
        margin="normal"
        fullWidth
        label="¿Para qué actividad requiere el préstamo?"
        name="actividad"
        value={form.actividad || ""}
        onChange={onInputChange}
        required
      />
      <TextField
        margin="normal"
        fullWidth
        label="¿Por cuántas horas?"
        type="number"
        name="horas"
        value={form.horas || ""}
        onChange={onInputChange}
        required
        inputProps={{ min: 1 }}
      />
    </>
  );
}