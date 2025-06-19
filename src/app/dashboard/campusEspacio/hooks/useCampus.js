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
  const res = await fetch("/api/espacios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...espacio, campus_id: campusId }),
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
  return { campus, loading, addCampus, editCampus, deleteCampus, addEspacio };
}