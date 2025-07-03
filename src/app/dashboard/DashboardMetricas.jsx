import { Box, Typography, Grid, Paper, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import CalendarioReservas from "./CalendarioReservas"; // Asegúrate de que la ruta sea correcta

export default function DashboardMetricas() {
  const [metricas, setMetricas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/metricas")
      .then(res => res.json())
      .then(data => {
        setMetricas(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (

    // en esta parte va el calendario
    <Box>
      <Box mb={4}>
        <CalendarioReservas />
      </Box>
      <Typography
        variant="h5"
        fontWeight={700}
        mb={3}
        color="text.primary"
        sx={{ letterSpacing: 0.5 }}
      >
        Métricas
      </Typography>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={160}>
          <CircularProgress />
        </Box>
      ) : (

        <Grid container spacing={3} alignItems="stretch">
          {metricas.map((metrica, idx) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={idx}
              sx={{
                display: "flex",
                alignItems: "stretch",
              }}
            >
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  textAlign: "center",
                  bgcolor: "#fff",
                  color: "text.primary",
                  height: 160,
                  minWidth: 0,
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  color="primary"
                  fontWeight={600}
                  gutterBottom
                  sx={{
                    color: "primary.main",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "100%",
                    maxWidth: "100%",
                  }}
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

      )}
    </Box>
  );
}