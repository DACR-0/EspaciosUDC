import { Grid } from "@mui/material";
import CampusCard from "./CampusCard";

export default function CampusList({ campusList, onSelectCampus, onDeleteCampus }) {
  return (
    <Grid container spacing={3}>
      {campusList.map((campus) => (
        <Grid item xs={12} sm={6} md={4} key={campus.idcampus || campus.id}>
          <CampusCard
            campus={campus}
            onClick={onSelectCampus}
            onDelete={onDeleteCampus}
          />
        </Grid>
      ))}
    </Grid>
  );
}