import React from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import PlaceDetails from "../PlaceDetails/PlaceDetails";
import useStyles from "./styles.js";

const List = ({
  places,
  childClick,
  loading,
  type,
  rating,
  setType,
  setRating,
}) => {
  const classes = useStyles();

  const [reference, setReference] = React.useState([]);
  React.useEffect(() => {
    setReference((refs) =>
      Array(places?.length)
        .fill()
        .map((_, key) => refs[key] || React.createRef())
    );
  }, [places]);

  console.log({ childClick });

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Resturants, Hotels and Attractions around you
      </Typography>
      {loading ? (
        <div className={classes.loading}>
          <CircularProgress size="3rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="Hotels">Hotels</MenuItem>
              <MenuItem value="Attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Rating</InputLabel>
            <Select value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, key) => (
              <Grid ref={reference[key]} item key={key} xs={12}>
                <PlaceDetails
                  place={place}
                  selected={Number(childClick) === key}
                  refProp={reference[key]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
