import { useState } from "react";
import PreguntaAbierta from "./preguntas/PreguntaAbierta";
import PreguntaOpcionMultiple from "./preguntas/PreguntaOpcionMultiple";
import PreguntaOpcionUnica from "./preguntas/PreguntaOpcionUnica";
import PreguntaSiNoArchivo from "./preguntas/PreguntaSiNoArchivo";
import PreguntaCampusEspacio from "./preguntas/PreguntaCampusEspacio";
import PreguntaFechaHora from "./preguntas/PreguntaFechaHora";

const publicoOpciones = [
  { value: "estudiantes", label: "Estudiantes" },
  { value: "docentes", label: "Docentes" },
  { value: "administrativos", label: "Administrativos" },
  { value: "egresados", label: "Egresados" },
  { value: "personal_externo", label: "Personal externo" },
];

const menoresOpciones = [
  { value: "si", label: "Sí" },
  { value: "no", label: "No" },
];

const asistentesOpciones = [
  { value: "menos_20", label: "Menos de 20" },
  { value: "20_50", label: "Entre 20 - 50" },
  { value: "50_100", label: "Entre 50 - 100" },
  { value: "100_250", label: "Entre 100 - 250" },
  { value: "mas_250", label: "Más de 250" },
];

// Ejemplo de imágenes de campus y espacios
const campusImages = [
  { value: "campus1", src: "/campus1.jpg", label: "Campus Centro" },
  { value: "campus2", src: "/campus2.jpg", label: "Campus Norte" },
];

const espaciosPorCampus: Record<string, { value: string; src: string; label: string }[]> = {
  campus1: [
    { value: "auditorio", src: "/auditorio.jpg", label: "Auditorio" },
    { value: "sala_reuniones", src: "/sala.jpg", label: "Sala de reuniones" },
  ],
  campus2: [
    { value: "cancha", src: "/cancha.jpg", label: "Cancha múltiple" },
    { value: "biblioteca", src: "/biblioteca.jpg", label: "Biblioteca" },
  ],
};

export default function AlquilerSurvey({ form, onChange }: {
  form: any;
  onChange: (field: string, value: any) => void;
}) {
  // Para archivo PDF
  const [convenioFile, setConvenioFile] = useState<File | null>(null);

  // Espacios según campus seleccionado
  const espaciosDisponibles = form.campus ? espaciosPorCampus[form.campus] || [] : [];

  return (
    <>
      <PreguntaAbierta
        label="1. Detalle de la actividad a realizar"
        value={form.detalleActividad || ""}
        onChange={val => onChange("detalleActividad", val)}
        required
      />

      <PreguntaOpcionMultiple
        label="2. ¿A qué público está dirigida la actividad?"
        options={publicoOpciones}
        value={form.publico || []}
        onChange={val => onChange("publico", val)}
      />

      <PreguntaOpcionUnica
        label="3. ¿El evento contará con la presencia de menores de edad (niños y/o adolescentes) que no están matriculados en la institución?"
        options={menoresOpciones}
        value={form.menores || ""}
        onChange={val => onChange("menores", val)}
        required
      />

      <PreguntaSiNoArchivo
        label="4. ¿La actividad a realizar se llevará a cabo en cumplimiento de obligaciones en el marco de un Convenio o Contrato Inter-administrativo? (Si marca Si, favor anexar copia del convenio o contrato)"
        value={form.convenio || ""}
        onChange={val => onChange("convenio", val)}
        file={convenioFile}
        onFileChange={e => {
          const file = e.target.files?.[0] || null;
          setConvenioFile(file);
          onChange("convenioArchivo", file);
        }}
      />

      <PreguntaCampusEspacio
        label="5. Seleccione el campus"
        images={campusImages}
        value={form.campus || ""}
        onChange={val => onChange("campus", val)}
      />

      <PreguntaCampusEspacio
        label="6. Seleccione el espacio"
        images={espaciosDisponibles}
        value={form.espacio || ""}
        onChange={val => onChange("espacio", val)}
      />

      <PreguntaFechaHora
        label="7. Seleccione la Fecha y hora del evento"
        value={form.fechaHora || { fechaInicio: "", fechaFin: "", horaInicio: "", horaFin: "" }}
        onChange={val => onChange("fechaHora", val)}
      />

      <PreguntaOpcionUnica
        label="8. Número de asistentes"
        options={asistentesOpciones}
        value={form.asistentes || ""}
        onChange={val => onChange("asistentes", val)}
        required
      />

      <PreguntaSiNoArchivo
        label="9. ¿Deseas anexar un archivo adicional? (carta de solicitud, orden o permiso)"
        value={form.archivoAdicional || ""}
        onChange={val => onChange("archivoAdicional", val)}
        file={form.archivoAdicionalFile}
        onFileChange={e => onChange("archivoAdicionalFile", e.target.files?.[0] || null)}
      />
    </>
  );
}