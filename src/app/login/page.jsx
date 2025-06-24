'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Avatar,
  InputAdornment,
  Alert,
  IconButton,
  CircularProgress,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VpnKeyOutlinedIcon from "@mui/icons-material/VpnKeyOutlined";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    setLoading(false);

    if (res.ok) {
      router.push("/dashboard");
    } else {
      setError("Credenciales inválidas");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "linear-gradient(135deg, #e3f0ff 0%, #f8fbff 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Botón volver arriba a la izquierda */}
      <IconButton
        onClick={() => router.push("/")}
        sx={{
          position: "absolute",
          top: 32,
          left: 32,
          bgcolor: "white",
          boxShadow: 2,
          "&:hover": { bgcolor: "#e3f2fd" },
        }}
        aria-label="Volver"
      >
        <ArrowBackIosNewIcon color="primary" />
      </IconButton>

      <Paper
        elevation={10}
        sx={{
          p: 5,
          borderRadius: 5,
          minWidth: 350,
          maxWidth: 400,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: "0 12px 40px 0 rgba(31, 38, 135, 0.18)",
          backdropFilter: "blur(2px)",
        }}
      >
        <Avatar
          sx={{
            bgcolor: "primary.main",
            mb: 2,
            width: 64,
            height: 64,
            boxShadow: 3,
          }}
        >
          <LockOutlinedIcon fontSize="large" />
        </Avatar>
        <Typography
          variant="h4"
          component="h1"
          color="primary"
          fontWeight={700}
          gutterBottom
          sx={{ letterSpacing: 1 }}
        >
          Iniciar sesión
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          mb={3}
          sx={{ textAlign: "center" }}
        >
          Ingresa tus credenciales para acceder al sistema
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <TextField
            label="Correo institucional"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            required
            autoFocus
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailOutlinedIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            required
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VpnKeyOutlinedIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2, mb: 1, fontWeight: 500 }}>
              {error}
            </Alert>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={loading}
            sx={{
              mt: 2,
              borderRadius: 2,
              fontWeight: 700,
              boxShadow: 3,
              py: 1.3,
              letterSpacing: 1,
              fontSize: "1.1rem",
            }}
            startIcon={loading ? <CircularProgress size={22} color="inherit" /> : null}
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </Box>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mt: 4, textAlign: "center" }}
        >
          © {new Date().getFullYear()} Universidad de Cartagena. Todos los derechos reservados.
        </Typography>
      </Paper>
    </Box>
  );
}