import { useEffect, useState, useMemo } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { es } from "date-fns/locale";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Box, Button, Modal, Typography, Chip } from "@mui/material";

const locales = { es };
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
    getDay,
    locales,
});

export default function CalendarioReservas() {
    const [eventos, setEventos] = useState([]);
    const [fechaActual, setFechaActual] = useState(new Date());
    const [eventoSeleccionado, setEventoSeleccionado] = useState(null);

    useEffect(() => {
        fetch("/api/reservas/calendario")
            .then(res => res.json())
            .then(data => {
                setEventos(
                    data.map(r => ({
                        ...r,
                        title: `${r.espacio} - ${r.campus} (${r.hora_inicio} - ${r.hora_fin})`,
                        start: new Date(r.fecha_inicio),
                        end: new Date(r.fecha_fin),
                    }))
                );
            });
    }, []);

    const eventPropGetter = useMemo(() => (event) => {
        let backgroundColor = "#eab308";
        if (event.estado === "aprobado") backgroundColor = "#22c55e";
        return { style: { backgroundColor, color: "#fff", borderRadius: 6, border: "none" } };
    }, []);

    return (
        <Box mb={4}>
            <div style={{ height: 500 }}>
                <Calendar
                    localizer={localizer}
                    events={eventos}
                    startAccessor="start"
                    endAccessor="end"
                    titleAccessor="title"
                    eventPropGetter={eventPropGetter}
                    messages={{
                        next: "Siguiente",
                        previous: "Anterior",
                        today: "Hoy",
                        month: "Mes",
                        week: "Semana",
                        day: "Día",
                        agenda: "Agenda",
                    }}
                    culture="es"
                    date={fechaActual}
                    onNavigate={setFechaActual}
                    views={["month"]}
                    popup
                    onSelectEvent={event => setEventoSeleccionado(event)}
                />
            </div>
            <Modal
    open={!!eventoSeleccionado}
    onClose={() => setEventoSeleccionado(null)}
    aria-labelledby="modal-reserva"
    aria-describedby="modal-detalle-reserva"
>
    <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        minWidth: 300,
        color: "#000" // <-- fuerza el texto negro en todo el modal
    }}>
        {eventoSeleccionado && (
            <>
                <Typography variant="h6" mb={2} sx={{ color: "#000" }}>
                    Nro. Reserva: {eventoSeleccionado.idreserva}
                </Typography>
                <Typography sx={{ color: "#000" }}>
                    Estado:
                </Typography>
                <Chip
                    label={eventoSeleccionado.estado}
                    sx={{
                        fontWeight: 600,
                        textTransform: "capitalize",
                        fontSize: "0.95em",
                        color: "#222",
                        bgcolor:
                            eventoSeleccionado.estado === "aprobado"
                                ? "#bbf7d0"
                                : eventoSeleccionado.estado === "rechazado"
                                    ? "#fecaca"
                                    : "#fef9c3",
                        border: "1px solid #e5e7eb",
                        mb: 2
                    }}
                    variant="filled"
                />
                <Typography mt={2} sx={{ color: "#000" }}>
                    Detalle: {eventoSeleccionado.titulo}
                </Typography>
            </>
        )}
    </Box>
</Modal>
        </Box>
    );
}