import { Card, CardMedia, CardContent, Typography } from "@mui/material";

export default function CampusCard({ campus, onClick }) {
  return (
    <Card
      sx={{ cursor: "pointer", transition: "0.2s", "&:hover": { boxShadow: 6 } }}
      onClick={() => onClick(campus)}
    >
      <CardMedia component="img" height="140" image={campus.imagen} alt={campus.nombre} />
      <CardContent>
        <Typography variant="h6" fontWeight={600} color="text.primary">
          {campus.nombre}
        </Typography>
      </CardContent>
    </Card>
  );
}