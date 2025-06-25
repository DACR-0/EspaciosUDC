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
  loading?: boolean;
}

export default function PreguntaCampusEspacio({
  label,
  images,
  value,
  onChange,
  loading = false,
}: PreguntaCampusEspacioProps) {
  return (
    <Box marginY={2}>
      <FormLabel>{label}</FormLabel>
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight={90} py={2}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          display="flex"
          gap={2}
          sx={{
            overflowX: "auto", // Scroll horizontal
            overflowY: "hidden",
            py: 1,
            // Oculta la barra de scroll en navegadores modernos (opcional)
            scrollbarWidth: "thin",
            "&::-webkit-scrollbar": {
              height: 8,
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#bdbdbd",
              borderRadius: 4,
            },
          }}
        >
          {images.map((img: CampusImage, idx: number) => (
            <Box
              key={idx}
              border={value === img.value ? 2 : 1}
              borderColor={value === img.value ? "primary.main" : "grey.300"}
              borderRadius={2}
              sx={{ cursor: "pointer", width: 120, minWidth: 120, flex: "0 0 auto" }}
              onClick={() => onChange(img.value)}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Box
                width={120}
                height={80}
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ overflow: "hidden", borderRadius: 2, background: "#f5f5f5" }}
              >
                <img
                  src={img.src ? `/uploads/campus/${img.src}` : "/campus-default.jpg"}
                  alt={img.label}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
              </Box>
              <Typography align="center" variant="caption" sx={{ mt: 1 }}>
                {img.label}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}