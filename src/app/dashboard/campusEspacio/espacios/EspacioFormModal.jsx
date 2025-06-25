import { useState } from "react";
import { Modal, Box, Typography, TextField, Stack, Button } from "@mui/material";

export default function EspacioFormModal({ open, onClose, onSubmit, form, setForm }) {
  const [imagenFile, setImagenFile] = useState(null);
  const [subiendo, setSubiendo] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setImagenFile(file);
  };

  const handleSubmit = async () => {
    if (!form.nombre || !imagenFile || !form.aforo) return;
    setSubiendo(true);

    const formData = new FormData();
    formData.append("file", imagenFile);

    try {
      // Usar el mismo endpoint de campus para subir la imagen
      const res = await fetch("/api/upload-campus", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.fileName) {
        onSubmit({ ...form, imagen: data.fileName });
        setImagenFile(null);
      }
    } catch (err) {
      // Maneja el error si lo deseas
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          minWidth: 320,
        }}
      >
        <Typography variant="h6" mb={2}>Agregar nuevo espacio</Typography>
        <TextField
          label="Nombre del espacio"
          fullWidth
          margin="normal"
          value={form.nombre}
          onChange={e => setForm({ ...form, nombre: e.target.value })}
        />
        <Button
          variant={imagenFile ? "contained" : "outlined"}
          component="label"
          sx={{ mt: 2, mb: 1 }}
          disabled={subiendo}
        >
          {imagenFile ? "Imagen seleccionada" : "Subir imagen"}
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleFileChange}
            disabled={subiendo}
          />
        </Button>
        {imagenFile && (
          <Typography variant="body2" color="text.secondary">
            {imagenFile.name}
          </Typography>
        )}
        <TextField
          label="Aforo máximo"
          fullWidth
          margin="normal"
          type="number"
          value={form.aforo}
          onChange={e => setForm({ ...form, aforo: e.target.value })}
        />
        <Stack direction="row" spacing={2} mt={2} justifyContent="flex-end">
          <Button onClick={onClose} disabled={subiendo}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={!form.nombre || !imagenFile || !form.aforo || subiendo}
          >
            {subiendo ? "Subiendo..." : "Agregar"}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}