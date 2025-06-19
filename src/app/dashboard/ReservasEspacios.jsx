import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

export default function ReservasEspacios() {
  // Datos simulados de reservas
  const reservas = [
    { id: 1, solicitante: "Juan Pérez", espacio: "Auditorio", fecha: "2024-07-10", estado: "Aprobada" },
    { id: 2, solicitante: "Ana Gómez", espacio: "Sala de reuniones", fecha: "2024-07-12", estado: "Pendiente" },
    { id: 3, solicitante: "Carlos Ruiz", espacio: "Cancha múltiple", fecha: "2024-07-15", estado: "Rechazada" },
  ];

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
              <TableCell sx={{ color: "text.primary", fontWeight: 600 }}>Espacio</TableCell>
              <TableCell sx={{ color: "text.primary", fontWeight: 600 }}>Fecha</TableCell>
              <TableCell sx={{ color: "text.primary", fontWeight: 600 }}>Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservas.map((reserva) => (
              <TableRow key={reserva.id}>
                <TableCell sx={{ color: "text.primary" }}>{reserva.solicitante}</TableCell>
                <TableCell sx={{ color: "text.primary" }}>{reserva.espacio}</TableCell>
                <TableCell sx={{ color: "text.primary" }}>{reserva.fecha}</TableCell>
                <TableCell sx={{ color: "text.primary" }}>{reserva.estado}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}