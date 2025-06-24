import { Grid, Typography } from "@mui/material";
import EspacioCard from "./EspacioCard";

export default function EspaciosList({ espacios, onDelete }) {
  if (!espacios || espacios.length === 0) {
    return <Typography color="text.secondary">No hay espacios registrados en este campus.</Typography>;
  }
  return (
    <Grid container spacing={3}>
      {espacios.map((espacio) => (
        <Grid item xs={12} sm={6} md={4} key={espacio.idespacio}>
          <EspacioCard espacio={espacio} onDelete={onDelete} />
        </Grid>
      ))}
    </Grid>
  );
}