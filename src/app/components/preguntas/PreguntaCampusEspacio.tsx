import { Typography, FormLabel, Box, CircularProgress } from "@mui/material";

interface CampusImage {
  value: string;
  src: string;
  label: string;
}

interface PreguntaCampusEspacioProps {
  label: string;
  images: CampusImage[];
  value: string;
  onChange: (value: string) => void;
  loading?: boolean; // <-- Agregado
}

export default function PreguntaCampusEspacio({
  label,
  images,
  value,
  onChange,
  loading = false, // <-- Valor por defecto
}: PreguntaCampusEspacioProps) {
  return (
    <Box marginY={2}>
      <FormLabel>{label}</FormLabel>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={90} py={2}>
          <CircularProgress />
        </Box>
      ) : (
        <Box display="flex" gap={2} overflow="auto">
          {images.map((img: CampusImage, idx: number) => (
            <Box
              key={idx}
              border={value === img.value ? 2 : 1}
              borderColor={value === img.value ? "primary.main" : "grey.300"}
              borderRadius={2}
              sx={{ cursor: "pointer" }}
              onClick={() => onChange(img.value)}
            >
              <img src={img.src} alt={img.label} width={120} height={80} style={{ borderRadius: 8 }} />
              <Typography align="center" variant="caption">{img.label}</Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}