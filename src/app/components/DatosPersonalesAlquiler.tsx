import { Button, Box, Typography } from "@mui/material";
import { useState } from "react";
import PreguntaTextoCorto from "./preguntas/PreguntaTextoCorto";
import PreguntaDesplegable from "./preguntas/PreguntaDesplegable";
import PreguntaTelefono from "./preguntas/PreguntaTelefono";

const opcionesDocumento = [
  { value: "CC", label: "Cédula de ciudadanía" },
  { value: "TI", label: "Tarjeta de identidad" },
  { value: "CE", label: "Cédula de extranjería" },
  { value: "PS", label: "Pasaporte" },
  // Puedes agregar más tipos si lo necesitas
];

export default function DatosPersonalesAlquiler({
  onSubmit,
  enviando,
  onBack,
}: {
  onSubmit: (data: any) => void;
  enviando: boolean;
  onBack: () => void;
}) {
  const [nombre, setNombre] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [organizacion, setOrganizacion] = useState("");
  const [cargo, setCargo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        onSubmit({
          nombre,
          tipoDocumento,
          identificacion,
          organizacion,
          cargo,
          telefono,
          correo,
        });
      }}
    >
      <Typography variant="h6" fontWeight={700} mb={2}>
        Información del solicitante
      </Typography>

      <PreguntaTextoCorto
        label="Nombre completo del solicitante"
        value={nombre}
        onChange={setNombre}
        required
      />

      <PreguntaDesplegable
        label="Tipo de documento"
        value={tipoDocumento}
        onChange={setTipoDocumento}
        options={opcionesDocumento}
        required
      />

      <PreguntaTextoCorto
        label="Número de documento"
        value={identificacion}
        onChange={setIdentificacion}
        required
      />

      <PreguntaTextoCorto
        label="Nombre de la entidad a la que pertenece"
        value={organizacion}
        onChange={setOrganizacion}
        required
      />

      <PreguntaTextoCorto
        label="Cargo dentro de la entidad"
        value={cargo}
        onChange={setCargo}
        required
      />

      <PreguntaTelefono
        label="Teléfono"
        value={telefono}
        onChange={setTelefono}
        required
      />

      <PreguntaTextoCorto
        label="Correo electrónico"
        value={correo}
        onChange={setCorreo}
        type="email"
        required
      />

      <Box mt={3} display="flex" justifyContent="center" gap={2}>
        <Button
          variant="outlined"
          color="primary"
          onClick={onBack}
          disabled={enviando}
        >
          Volver
        </Button>
        <Button type="submit" variant="contained" color="primary" disabled={enviando}>
          Finalizar
        </Button>
      </Box>
    </form>
  );
}