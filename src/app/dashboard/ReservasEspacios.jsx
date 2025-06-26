import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState, useCallback } from "react";
import ModalDetalleReserva from "./ModalDetalleReserva";

export default function ReservasEspacios() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);

  // Función para cargar reservas (puede ser reutilizada)
  const cargarReservas = useCallback(() => {
    setLoading(true);
    fetch("/api/reservas")
      .then(res => res.json())
      .then(data => {
        setReservas(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    cargarReservas();
  }, [cargarReservas]);

  // Función para cerrar el modal y recargar reservas
  const handleCloseModal = () => {
    setModalOpen(false);
    setReservaSeleccionada(null);
    cargarReservas();
  };

  return (
    <Box>
      <Typography
        variant="h5"
        fontWeight={700}
        mb={3}
        color="text.primary"
        sx={{ letterSpacing: 0.5 }}
      >
        Reservas de Espacios
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "text.primary", fontWeight: 600 }}>Solicitante</TableCell>
              <TableCell sx={{ color: "text.primary", fontWeight: 600 }}>Documento</TableCell>
              <TableCell sx={{ color: "text.primary", fontWeight: 600 }}>Fecha Solicitud</TableCell>
              <TableCell sx={{ color: "text.primary", fontWeight: 600 }}>Campus</TableCell>
              <TableCell sx={{ color: "text.primary", fontWeight: 600 }}>Espacio</TableCell>
              <TableCell sx={{ color: "text.primary", fontWeight: 600 }}>Tipo</TableCell>
              <TableCell sx={{ color: "text.primary", fontWeight: 600 }}>Estado</TableCell>
              <TableCell sx={{ color: "text.primary", fontWeight: 600 }}>Ver</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <CircularProgress size={32} />
                </TableCell>
              </TableRow>
            ) : reservas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No hay reservas registradas.
                </TableCell>
              </TableRow>
            ) : (
              reservas.map((reserva, idx) => (
                <TableRow key={idx}>
                  <TableCell>{reserva.solicitante}</TableCell>
                  <TableCell>{reserva.documento}</TableCell>
                  <TableCell>{reserva.fecha_solicitud}</TableCell>
                  <TableCell>{reserva.campus}</TableCell>
                  <TableCell>{reserva.espacio}</TableCell>
                  <TableCell>{reserva.tipo_solicitud}</TableCell>
                  <TableCell>{reserva.estado}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => {
                        setReservaSeleccionada(reserva);
                        setModalOpen(true);
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <ModalDetalleReserva
        open={modalOpen}
        onClose={handleCloseModal}
        reserva={reservaSeleccionada}
      />
    </Box>
  );
}