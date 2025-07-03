import * as React from "react";
import { useEffect, useState, useCallback } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Chip, IconButton, Button, Box } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ModalDetalleReserva from "./ModalDetalleReserva";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export default function ReservasEspacios() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);

  const cargarReservas = useCallback(() => {
    setLoading(true);
    fetch("/api/reservas")
      .then(res => res.json())
      .then(data => {
        setReservas(data.map((r, i) => ({ ...r, id: r.idreserva || r.numero_reserva || i })));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    cargarReservas();
  }, [cargarReservas]);

  const handleCloseModal = () => {
    setModalOpen(false);
    setReservaSeleccionada(null);
    cargarReservas();
  };

  // Función para exportar a Excel usando exceljs
  const exportarExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Reservas");

    worksheet.columns = [
      { header: "Nro. Reserva", key: "numero_reserva", width: 15 },
      { header: "Solicitante", key: "solicitante", width: 25 },
      { header: "Documento", key: "documento", width: 15 },
      { header: "Fecha Solicitud", key: "fecha_solicitud", width: 20 },
      { header: "Campus", key: "campus", width: 20 },
      { header: "Espacio", key: "espacio", width: 20 },
      { header: "Tipo", key: "tipo_solicitud", width: 15 },
      { header: "Estado", key: "estado", width: 15 },
    ];

    reservas.forEach((row) => {
      worksheet.addRow({
        numero_reserva: row.numero_reserva,
        solicitante: row.solicitante,
        documento: row.documento,
        fecha_solicitud: row.fecha_solicitud,
        campus: row.campus,
        espacio: row.espacio,
        tipo_solicitud: row.tipo_solicitud,
        estado: row.estado,
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, "reservas.xlsx");
  };

  const columns = [
    { field: "numero_reserva", headerName: "Nro. Reserva", width: 120 },
    { field: "solicitante", headerName: "Solicitante", width: 260 },
    { field: "documento", headerName: "Documento", width: 120 },
    { field: "fecha_solicitud", headerName: "Fecha Solicitud", width: 180 },
    { field: "campus", headerName: "Campus", width: 220 },
    { field: "espacio", headerName: "Espacio", width: 120 },
    { field: "tipo_solicitud", headerName: "Tipo", width: 120 },
    {
      field: "estado",
      headerName: "Estado",
      width: 120,
      renderCell: (params) => (
        <Chip
          label={params.value}
          sx={{
            fontWeight: 600,
            textTransform: "capitalize",
            fontSize: "0.95em",
            color: "#222",
            bgcolor:
              params.value === "aprobado"
                ? "#bbf7d0"
                : params.value === "rechazado"
                ? "#fecaca"
                : "#fef9c3",
            border: "1px solid #e5e7eb",
          }}
          variant="filled"
        />
      ),
    },
    {
      field: "ver",
      headerName: "Ver",
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <IconButton
          color="primary"
          onClick={() => {
            setReservaSeleccionada(params.row);
            setModalOpen(true);
          }}
        >
          <VisibilityIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Paper sx={{ height: "80vh", width: "100%", p: 2 }}>
      <Box mb={2} display="flex" justifyContent="flex-end">
        <Button variant="contained" color="success" onClick={exportarExcel}>
          Exportar a Excel
        </Button>
      </Box>
      <DataGrid
        rows={reservas}
        columns={columns}
        loading={loading}
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 10 } },
        }}
        sx={{
          border: 0,
          height: "100%",
          "& .MuiDataGrid-row": { minHeight: 56, maxHeight: 56 },
          "& .MuiDataGrid-cell": { py: 1 },
        }}
        disableRowSelectionOnClick
        autoHeight={false}
        density="comfortable"
      />
      <ModalDetalleReserva
        open={modalOpen}
        onClose={handleCloseModal}
        reserva={reservaSeleccionada}
      />
    </Paper>
  );
}