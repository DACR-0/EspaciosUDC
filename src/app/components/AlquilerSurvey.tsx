import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
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

// Usamos forwardRef para exponer la función de validación al padre
const AlquilerSurvey = forwardRef(function AlquilerSurvey({ form, onChange }: {
  form: any;
  onChange: (field: string, value: any) => void;
}, ref) {
  const [convenioFile, setConvenioFile] = useState<File | null>(null);
  const [subiendoArchivo, setSubiendoArchivo] = useState(false);

  // Estados para archivo adicional (pregunta 9)
  const [archivoAdicionalFile, setArchivoAdicionalFile] = useState<File | null>(null);
  const [subiendoArchivoAdicional, setSubiendoArchivoAdicional] = useState(false);

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

  // función para subir el archivo de convenio (pregunta 4)
  const handleConvenioFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setConvenioFile(file);

    if (file && form.convenio === "si") {
      setSubiendoArchivo(true);
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/upload-convenio", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.fileName) {
          onChange("convenioArchivo", data.fileName);
        }
      } finally {
        setSubiendoArchivo(false);
      }
    } else {
      onChange("convenioArchivo", null);
    }
  };

  // función para subir el archivo adicional (pregunta 9)
  const handleArchivoAdicionalFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0] || null;
  setArchivoAdicionalFile(file);

  if (file && form.archivoAdicional === "si") {
    setSubiendoArchivoAdicional(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload-convenio", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.fileName) {
        onChange("archivoAdicionalFile", data.fileName);
      }
    } finally {
      setSubiendoArchivoAdicional(false);
    }
  } else {
    onChange("archivoAdicionalFile", null);
  }
};
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

  // --- VALIDACIÓN DE FORMULARIO ---
  function validarFormulario() {
    // Ajusta los nombres de los campos según tu estructura real
    return (
      !!form.detalleActividad &&
      Array.isArray(form.publico) && form.publico.length > 0 &&
      !!form.menores &&
      !!form.convenio &&
      !!form.campus &&
      !!form.espacio &&
      !!form.fechaHora &&
      !!form.fechaHora.fechaInicio &&
      !!form.fechaHora.fechaFin &&
      !!form.fechaHora.horaInicio &&
      !!form.fechaHora.horaFin &&
      !!form.asistentes
      // archivo adicional es opcional
    );
  }

  // Exponer la función de validación al padre
  useImperativeHandle(ref, () => ({
    validarFormulario
  }));

  return (
    <>
      <PreguntaAbierta
        label="1. Detalle de la actividad a realizar"
        value={form.detalleActividad || ""}
        onChange={val => onChange("detalleActividad", val)}
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
      />

      <PreguntaSiNoArchivo
        label="4. ¿La actividad a realizar se llevará a cabo en cumplimiento de obligaciones en el marco de un Convenio o Contrato Inter-administrativo? (Si marca Si, favor anexar copia del convenio o contrato)"
        value={form.convenio || ""}
        onChange={val => {
          onChange("convenio", val);
          if (val === "no") {
            onChange("convenioArchivo", null);
            setConvenioFile(null);
          }
        }}
        file={convenioFile}
        onFileChange={handleConvenioFileChange}
        loading={subiendoArchivo}
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
      />

      <PreguntaSiNoArchivo
        label="9. ¿Deseas anexar un archivo adicional? (carta de solicitud, orden o permiso)"
        value={form.archivoAdicional || ""}
        onChange={val => {
          onChange("archivoAdicional", val);
          if (val === "no") {
            onChange("archivoAdicionalFile", null);
            setArchivoAdicionalFile(null);
          }
        }}
        file={archivoAdicionalFile}
        onFileChange={handleArchivoAdicionalFileChange}
        loading={subiendoArchivoAdicional}
      />
    </>
  );
});

export default AlquilerSurvey;