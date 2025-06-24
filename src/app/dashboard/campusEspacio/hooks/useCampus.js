import { useState, useEffect } from "react";

export default function useCampus() {
  const [campus, setCampus] = useState([]);
  const [loading, setLoading] = useState(true);

  // Obtener todos los campus al cargar
  useEffect(() => {
    fetch("/api/campus")
      .then(res => res.json())
      .then(data => setCampus(data))
      .finally(() => setLoading(false));
  }, []);

  // Crear campus
  const addCampus = async (nuevo) => {
    const res = await fetch("/api/campus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevo),
    });
    const creado = await res.json();
    setCampus(prev => [...prev, { ...creado, espacios: [] }]);
  };

  // Editar campus
  const editCampus = async (editado) => {
    await fetch("/api/campus", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editado),
    });
    setCampus(prev =>
      prev.map(c => (c.idcampus === editado.id ? { ...c, ...editado } : c))
    );
  };

  // Eliminar campus
  const deleteCampus = async (id) => {
    await fetch("/api/campus", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setCampus(prev => prev.filter(c => c.idcampus !== id));
  };

  // Agregar espacio a un campus
  const addEspacio = async (campusId, espacio) => {
    if (!campusId) {
      alert("No se ha seleccionado un campus.");
      return;
    }
    // Asegúrate de que capacidad sea un número o null
    const capacidad = espacio.aforo ? parseInt(espacio.aforo, 10) : null;
    const res = await fetch("/api/espacios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: espacio.nombre,
        imagen: espacio.imagen,
        capacidad,
        campus_id: campusId,
      }),
    });
    const creado = await res.json();
    setCampus(prev =>
      prev.map(c =>
        c.idcampus === campusId
          ? { ...c, espacios: [...(c.espacios || []), creado] }
          : c
      )
    );
  };

  // Eliminar espacio
  const deleteEspacio = async (espacioId) => {
    await fetch("/api/espacios", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: espacioId }),
    });
    // Opcional: actualizar el estado local si lo necesitas
    setCampus(prev =>
      prev.map(c => ({
        ...c,
        espacios: (c.espacios || []).filter(e => e.idespacio !== espacioId)
      }))
    );
  };

  return { campus, loading, addCampus, editCampus, deleteCampus, addEspacio, deleteEspacio };
}