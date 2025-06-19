"use client";

import SurveyForm from "./components/SurveyForm";
import { Button, Box, Typography, AppBar, Toolbar, Container } from "@mui/material";
import { IconLogin } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Barra superior con botón de login */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "transparent",
          boxShadow: "none",
          pt: 2,
        }}
      >
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<IconLogin size={20} />}
            onClick={() => router.push("/login")}
            sx={{ fontWeight: 600, borderRadius: 2 }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="lg" // Cambia de "sm" a "md" para mayor ancho
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start", // Coloca el contenido más arriba
          mt: 6, // Margen superior para separarlo de la barra
        }}
      >
        <SurveyForm />
      </Container>
    </Box>
  );
}