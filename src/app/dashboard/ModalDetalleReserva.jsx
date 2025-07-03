import { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Divider, Grid } from "@mui/material";

// Opcional: Mapear los nombres de los campos a etiquetas más legibles
const labelsSolicitante = {
  nombre: "Nombre",
  tipo_doc: "Tipo de documento",
  documento_indentidad: "Número de documento",
  entidad: "Entidad",
  cargo_entidad: "Cargo en la entidad",
  telefono: "Teléfono",
  email: "Correo electrónico",
  registrado_en: "Registrado en",
};

const labelsFormulario = {
  p1_detalles: "Detalle de la actividad",
  p2_publico: "Público",
  p3_menores: "Menores",
  p4_convenio: "Convenio",
  p7_fechaInicio: "Fecha inicio",
  p7_fechaFin: "Fecha fin",
  p7_horaInicio: "Hora inicio",
  p7_horaFin: "Hora fin",
  p8_asistentes: "Número de asistentes",
  p9_anexo: "Anexo",
};

export default function ModalDetalleReserva({ open, onClose, reserva, onAprobar, onRechazar }) {
  const [detalle, setDetalle] = useState(null);
  const [actualizando, setActualizando] = useState(false);

  useEffect(() => {
    if (open && reserva?.id_solicitante && reserva?.id_formulario) {
      fetch(`/api/reservas/detalles?id_solicitante=${reserva.id_solicitante}&id_formulario=${reserva.id_formulario}`)
        .then(res => res.json())
        .then(data => setDetalle(data));
    }
  }, [open, reserva]);

  if (!detalle) return null;

  const { solicitante, formulario } = detalle;

  // Función para actualizar el estado de la reserva
  const actualizarEstado = async (nuevoEstado) => {
    setActualizando(true);
    await fetch("/api/reservas/estado", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idreserva: reserva.idreserva, estado: nuevoEstado }),
    });
    setActualizando(false);
    onClose();
    if (nuevoEstado === "aprobado" && onAprobar) onAprobar();
    if (nuevoEstado === "rechazado" && onRechazar) onRechazar();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Detalle de la Reserva</DialogTitle>
      <DialogContent dividers>
        <Typography variant="h6" gutterBottom>Información del Solicitante</Typography>
        <Box mb={2}>
          <Grid container spacing={1}>
            {solicitante && Object.entries(solicitante).map(([key, value]) => (
              labelsSolicitante[key] && (
                <Grid item xs={12} sm={6} key={key}>
                  <Typography>
                    <b>{labelsSolicitante[key]}:</b>{" "}
                    {key === "registrado_en" && value
                      ? new Date(value).toLocaleString("es-CO", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit"
                      })
                      : value?.toString()}
                  </Typography>
                </Grid>
              )
            ))}
          </Grid>
        </Box>
        <Divider />
        <Typography variant="h6" gutterBottom mt={2}>Formulario de Reserva</Typography>
        <Box>
          <Grid container spacing={2} alignItems="center">
            {/* Primera fila: Campus y Espacio */}
            <Grid item xs={12} sm={6}>
              <Typography>
                <b>Campus:</b> {formulario.campus_nombre}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                <b>Espacio:</b> {formulario.espacio_nombre}
              </Typography>
            </Grid>
            {/* Segunda fila: Detalle de la actividad */}
            <Grid item xs={12}>
              <Typography>
                <b>{labelsFormulario.p1_detalles}:</b> {formulario.p1_detalles}
              </Typography>
            </Grid>
            {/* Resto de campos en filas de dos columnas */}
            <Grid item xs={12} sm={6}>
              <Typography>
                <b>{labelsFormulario.p2_publico}:</b> {formulario.p2_publico}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                <b>{labelsFormulario.p3_menores}:</b> {formulario.p3_menores}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                <b>{labelsFormulario.p4_convenio}:</b>{" "}
                {formulario.p4_convenio
                  ? (
                    <Button
                      variant="outlined"
                      size="small"
                      href={`/uploads/convenios/${formulario.p4_convenio}`}
                      target="_blank"
                      rel="noopener"
                    >
                      Ver archivo
                    </Button>
                  ) : "NO"}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                <b>{labelsFormulario.p7_fechaInicio}:</b> {formulario.p7_fechaInicio}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                <b>{labelsFormulario.p7_fechaFin}:</b> {formulario.p7_fechaFin}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                <b>{labelsFormulario.p7_horaInicio}:</b> {formulario.p7_horaInicio}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                <b>{labelsFormulario.p7_horaFin}:</b> {formulario.p7_horaFin}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                <b>{labelsFormulario.p8_asistentes}:</b> {formulario.p8_asistentes}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography>
                <b>{labelsFormulario.p9_anexo}:</b>{" "}
                {formulario.p9_anexo
                  ? (
                    <Button
                      variant="outlined"
                      size="small"
                      href={`/uploads/convenios/${formulario.p9_anexo}`}
                      target="_blank"
                      rel="noopener"
                    >
                      Ver archivo
                    </Button>
                  ) : "NO"}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="inherit"
          variant="text"
          disabled={actualizando}
        >
          Cerrar
        </Button>
        <Button
          color="error"
          variant="outlined"
          onClick={() => actualizarEstado("rechazado")}
          disabled={actualizando}
        >
          Rechazar
        </Button>
        <Button
          color="success"
          variant="contained"
          onClick={() => actualizarEstado("aprobado")}
          disabled={actualizando}
        >
          Aprobar
        </Button>
      </DialogActions>
    </Dialog>
  );
}