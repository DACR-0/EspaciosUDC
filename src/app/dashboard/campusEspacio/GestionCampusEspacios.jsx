import { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CampusList from "./campus/CampusList";
import CampusFormModal from "./campus/CampusFormModal";
import EspaciosList from "./espacios/EspaciosList";
import EspacioFormModal from "./espacios/EspacioFormModal";
import useCampus from "./hooks/useCampus";

export default function GestionCampusEspacios() {
  const { campus, addCampus, addEspacio } = useCampus();
  const [modalCampus, setModalCampus] = useState(false);
  const [modalEspacio, setModalEspacio] = useState(false);
  const [formCampus, setFormCampus] = useState({ nombre: "", imagen: "" });
  const [formEspacio, setFormEspacio] = useState({ nombre: "", imagen: "", aforo: "" });
  const [campusSeleccionado, setCampusSeleccionado] = useState(null);

  // Vista principal: lista de campus
  if (!campusSeleccionado) {
    return (
      <Box>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <Typography variant="h5" fontWeight={700} color="text.primary">
            Gestión de Campus
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => setModalCampus(true)}
          >
            Crear campus
          </Button>
        </Box>
        <CampusList campusList={campus} onSelectCampus={setCampusSeleccionado} />
        <CampusFormModal
          open={modalCampus}
          onClose={() => setModalCampus(false)}
          onSubmit={() => {
            addCampus(formCampus);
            setFormCampus({ nombre: "", imagen: "" });
            setModalCampus(false);
          }}
          form={formCampus}
          setForm={setFormCampus}
        />
      </Box>
    );
  }

  // Vista de espacios de un campus
  return (
    <Box>
      <Box display="flex" alignItems="center" mb={3}>
        <Button onClick={() => setCampusSeleccionado(null)} sx={{ mr: 2 }} startIcon={<ArrowBackIcon />}>
          Volver
        </Button>
        <Typography variant="h5" fontWeight={700} color="text.primary">
          Espacios de {campusSeleccionado.nombre}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ ml: "auto" }}
          onClick={() => setModalEspacio(true)}
        >
          Agregar espacio
        </Button>
      </Box>
      <EspaciosList espacios={campusSeleccionado.espacios} />
      <EspacioFormModal
        open={modalEspacio}
        onClose={() => setModalEspacio(false)}
        onSubmit={() => {
          addEspacio(campusSeleccionado.idcampus, formEspacio);
          setFormEspacio({ nombre: "", imagen: "", aforo: "" });
          setModalEspacio(false);
        }}
        form={formEspacio}
        setForm={setFormEspacio}
      />
    </Box>
  );
}