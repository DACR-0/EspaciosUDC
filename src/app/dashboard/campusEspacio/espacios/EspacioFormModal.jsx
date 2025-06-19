import { Modal, Box, Typography, TextField, Stack, Button } from "@mui/material";

export default function EspacioFormModal({ open, onClose, onSubmit, form, setForm }) {
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
        <TextField
          label="URL de imagen"
          fullWidth
          margin="normal"
          value={form.imagen}
          onChange={e => setForm({ ...form, imagen: e.target.value })}
          placeholder="https://..."
        />
        <TextField
          label="Aforo máximo"
          fullWidth
          margin="normal"
          type="number"
          value={form.aforo}
          onChange={e => setForm({ ...form, aforo: e.target.value })}
        />
        <Stack direction="row" spacing={2} mt={2} justifyContent="flex-end">
          <Button onClick={onClose}>Cancelar</Button>
          <Button
            variant="contained"
            onClick={onSubmit}
            disabled={!form.nombre || !form.imagen || !form.aforo}
          >
            Agregar
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}