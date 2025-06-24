import { useState, useEffect } from "react";
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

export default function AlquilerSurvey({ form, onChange }: {
  form: any;
  onChange: (field: string, value: any) => void;
}) {
  const [convenioFile, setConvenioFile] = useState<File | null>(null);

  // Campus y espacios desde la base de datos
  const [campusList, setCampusList] = useState<{ value: string, src: string, label: string }[]>([]);
  const [espaciosList, setEspaciosList] = useState<{ value: string, src: string, label: string }[]>([]);
  const [loadingCampus, setLoadingCampus] = useState(false);
  const [loadingEspacios, setLoadingEspacios] = useState(false);

  // Cargar campus al montar
  useEffect(() => {
    setLoadingCampus(true);
    fetch("/api/campus")
      .then(res => res.json())
      .then(data => {
        setCampusList(
          data.map((c: any) => ({
            value: c.idcampus.toString(),
            src: c.imagen || "/campus-default.jpg",
            label: c.nombre,
          }))
        );
      })
      .finally(() => setLoadingCampus(false));
  }, []);

  // Cargar espacios cuando se selecciona un campus
  useEffect(() => {
    if (form.campus) {
      setLoadingEspacios(true);
      fetch(`/api/espacios?campus_id=${form.campus}`)
        .then(res => res.json())
        .then(data => {
          setEspaciosList(
            data.map((e: any) => ({
              value: e.idespacio.toString(),
              src: e.imagen || "/espacio-default.jpg",
              label: e.nombre,
            }))
          );
        })
        .finally(() => setLoadingEspacios(false));
    } else {
      setEspaciosList([]);
    }
  }, [form.campus]);

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
        images={campusList}
        value={form.campus || ""}
        onChange={val => onChange("campus", val)}
        loading={loadingCampus}
      />

      <PreguntaCampusEspacio
        label="6. Seleccione el espacio"
        images={espaciosList}
        value={form.espacio || ""}
        onChange={val => onChange("espacio", val)}
        loading={loadingEspacios}
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