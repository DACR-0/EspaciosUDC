import { useState, useEffect } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CampusList from "./campus/CampusList";
import CampusFormModal from "./campus/CampusFormModal";
import EspaciosList from "./espacios/EspaciosList";
import EspacioFormModal from "./espacios/EspacioFormModal";
import useCampus from "./hooks/useCampus";

export default function GestionCampusEspacios() {
  const { campus, addCampus, addEspacio, deleteEspacio, deleteCampus } = useCampus();
  const [modalCampus, setModalCampus] = useState(false);
  const [modalEspacio, setModalEspacio] = useState(false);
  const [formCampus, setFormCampus] = useState({ nombre: "", imagen: "" });
  const [formEspacio, setFormEspacio] = useState({ nombre: "", imagen: "", aforo: "" });
  const [campusSeleccionado, setCampusSeleccionado] = useState(null);
  const [espacios, setEspacios] = useState([]);
  const [loadingEspacios, setLoadingEspacios] = useState(false);

  // Cargar espacios al seleccionar un campus
  useEffect(() => {
    if (campusSeleccionado) {
      setLoadingEspacios(true);
      fetch(`/api/espacios?campus_id=${campusSeleccionado.idcampus}`)
        .then(res => res.json())
        .then(data => setEspacios(data))
        .finally(() => setLoadingEspacios(false));
    }
  }, [campusSeleccionado]);

  // Eliminar espacio y recargar lista
  const handleDeleteEspacio = async (espacioId) => {
    setLoadingEspacios(true);
    await deleteEspacio(espacioId);
    fetch(`/api/espacios?campus_id=${campusSeleccionado.idcampus}`)
      .then(res => res.json())
      .then(data => setEspacios(data))
      .finally(() => setLoadingEspacios(false));
  };

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
        <CampusList
          campusList={campus}
          onSelectCampus={setCampusSeleccionado}
          onDeleteCampus={deleteCampus}
        />
        <CampusFormModal
          open={modalCampus}
          onClose={() => setModalCampus(false)}
          onSubmit={nuevoCampus => {
            addCampus(nuevoCampus);
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
      {loadingEspacios ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={200}>
          <CircularProgress />
        </Box>
      ) : (
        <EspaciosList espacios={espacios} onDelete={handleDeleteEspacio} />
      )}
      <EspacioFormModal
        open={modalEspacio}
        onClose={() => setModalEspacio(false)}
        onSubmit={async nuevoEspacio => {
          setLoadingEspacios(true);
          await addEspacio(campusSeleccionado.idcampus, nuevoEspacio); // Usa el argumento recibido
          // Recargar espacios después de agregar uno nuevo
          fetch(`/api/espacios?campus_id=${campusSeleccionado.idcampus}`)
            .then(res => res.json())
            .then(data => setEspacios(data))
            .finally(() => setLoadingEspacios(false));
          setFormEspacio({ nombre: "", imagen: "", aforo: "" });
          setModalEspacio(false);
        }}
        form={formEspacio}
        setForm={setFormEspacio}
      />
    </Box>
  );
}