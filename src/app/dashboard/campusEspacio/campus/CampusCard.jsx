import { useState } from "react";
import { Card, CardMedia, CardContent, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CampusCard({ campus, onClick, onDelete }) {
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleDelete = () => {
    setOpenConfirm(false);
    if (onDelete) onDelete(campus.idcampus);
  };

  return (
    <Card
      sx={{
        width: 250,
        height: 220,
        cursor: "pointer",
        transition: "0.2s",
        "&:hover": { boxShadow: 6 },
        position: "relative"
      }}
      onClick={() => onClick(campus)}
    >
      {/* Botón eliminar */}
      <IconButton
        size="small"
        sx={{ position: "absolute", top: 4, left: 4, zIndex: 2, bgcolor: "#fff", "&:hover": { bgcolor: "#ffeaea" } }}
        onClick={e => {
          e.stopPropagation();
          setOpenConfirm(true);
        }}
      >
        <DeleteIcon color="error" fontSize="small" />
      </IconButton>
      <CardMedia
        component="img"
        image={campus.imagen ? `/uploads/campus/${campus.imagen}` : "/campus-default.jpg"}
        alt={campus.nombre}
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
          {campus.nombre}
        </Typography>
      </CardContent>
      {/* Modal de confirmación */}
      <Dialog open={openConfirm} onClose={() => setOpenConfirm(false)}>
        <DialogTitle>¿Eliminar campus?</DialogTitle>
        <DialogContent>
          ¿Estás seguro de que deseas eliminar el campus <b>{campus.nombre}</b>?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirm(false)}>Cancelar</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>Eliminar</Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}