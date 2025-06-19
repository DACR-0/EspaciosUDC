import { Box, Typography, Grid, Paper } from "@mui/material";

export default function DashboardMetricas() {
  // Ejemplo de métricas simuladas
  const metricas = [
    { label: "Solicitudes totales", valor: 120 },
    { label: "Solicitudes aprobadas", valor: 85 },
    { label: "Solicitudes rechazadas", valor: 20 },
    { label: "Pendientes por revisar", valor: 15 },
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
        Dashboard de Métricas
      </Typography>
      <Grid container spacing={3}>
        {metricas.map((metrica, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Paper
              elevation={4}
              sx={{
                p: 3,
                textAlign: "center",
                bgcolor: "#fff",
                color: "text.primary",
              }}
            >
              <Typography
                variant="h6"
                color="primary"
                fontWeight={600}
                gutterBottom
                sx={{ color: "primary.main" }}
              >
                {metrica.label}
              </Typography>
              <Typography
                variant="h4"
                fontWeight={700}
                color="text.primary"
                sx={{ color: "text.primary" }}
              >
                {metrica.valor}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}