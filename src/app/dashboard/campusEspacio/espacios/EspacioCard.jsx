import { Card, CardMedia, CardContent, Typography } from "@mui/material";

export default function EspacioCard({ espacio }) {
  return (
    <Card>
      <CardMedia component="img" height="140" image={espacio.imagen} alt={espacio.nombre} />
      <CardContent>
        <Typography variant="h6" fontWeight={600} color="text.primary">
          {espacio.nombre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Aforo máximo: {espacio.aforo}
        </Typography>
      </CardContent>
    </Card>
  );
}