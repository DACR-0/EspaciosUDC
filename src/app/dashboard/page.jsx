'use client';

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Tabs, Tab, Box, Typography, IconButton } from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ApartmentIcon from "@mui/icons-material/Apartment";
import EventNoteIcon from "@mui/icons-material/EventNote";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardMetricas from "./DashboardMetricas";
import GestionCampusEspacios from "./campusEspacio/GestionCampusEspacios";
import ReservasEspacios from "./ReservasEspacios";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [tab, setTab] = useState(0);

  if (status === "loading") {
    return <p>Cargando sesión...</p>;
  }

  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography
          variant="h5"
          fontWeight={700}
          color="text.primary"
          sx={{ letterSpacing: 0.5 }}
        >
          Bienvenido, {session.user.name || session.user.email}
        </Typography>
        <IconButton
          onClick={() => signOut({ callbackUrl: "/login" })}
          color="error"
          size="large"
          sx={{
            ml: 2,
            bgcolor: "#fff",
            border: "1px solid #dc2626",
            '&:hover': { bgcolor: "#ffeaea" }
          }}
          title="Cerrar sesión"
        >
          <LogoutIcon />
        </IconButton>
      </Box>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{
          mb: 3,
          "& .MuiTab-root": { color: "text.primary", fontWeight: 600, minWidth: 180 },
          "& .Mui-selected": { color: "primary.main" },
        }}
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab icon={<DashboardIcon />} iconPosition="start" label="Dashboard" />
        <Tab icon={<ApartmentIcon />} iconPosition="start" label="Campus y Espacios" />
        <Tab icon={<EventNoteIcon />} iconPosition="start" label="Reservas" />
      </Tabs>
      {tab === 0 && <DashboardMetricas />}
      {tab === 1 && <GestionCampusEspacios />}
      {tab === 2 && <ReservasEspacios />}
    </Box>
  );
}