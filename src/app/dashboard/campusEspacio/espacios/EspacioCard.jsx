import { useState } from "react";
import { Card, CardMedia, CardContent, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function EspacioCard({ espacio, onDelete }) {
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleDelete = () => {
    setOpenConfirm(false);
    if (onDelete) onDelete(espacio.idespacio);
  };

  return (
    <Card
      sx={{
        width: 250,
        height: 220,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative"
      }}
    >
      {/* Botón eliminar */}
      <IconButton
        size="small"
        sx={{ position: "absolute", top: 4, left: 4, zIndex: 2, bgcolor: "#fff", "&:hover": { bgcolor: "#ffeaea" } }}
        onClick={() => setOpenConfirm(true)}
      >
        <DeleteIcon color="error" fontSize="small" />
      </IconButton>
      <CardMedia
        component="img"
        image={espacio.imagen ? `/uploads/campus/${espacio.imagen}` : "/espacio-default.jpg"}
        alt={espacio.nombre}
        sx={{
          height: 110,
          width: "100%",
          objectFit: "cover",
          objectPosition: "center",
          backgroundColor: "#f5f5f5"
        }}
      />
      <CardContent sx={{ p: 1 }}>
        <Typography variant="h6" fontWeight={600} color="text.primary" align="center">
          {espacio.nombre}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          Aforo máximo: {espacio.capacidad}
        </Typography>
      </CardContent>
      {/* Modal de confirmación */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>Eliminar espacio</DialogTitle>
        <DialogContent>
          ¿Estás seguro de que deseas eliminar el espacio <b>{espacio.nombre}</b>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancelar</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>Eliminar</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}