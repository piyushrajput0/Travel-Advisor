import React, {useState ,useEffect ,createRef} from "react";
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
  places,            //name of the restaurant, hotels, attractions
  childClick,       // when click on any card on map
  loading,
  type,
  rating,
  setType,
  setRating,
}) => {
  const classes = useStyles();

  const [reference, setReference] = useState([]); //state field
  // console.log("childClick");
  useEffect(() => {
    setReference((refs) =>
      Array(places?.length)
        .fill()
        .map((_, key) => refs[key] || createRef())
    );
  }, [places]);

  

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Resturants, Hotels and Attractions around you
      </Typography>
      {loading ? ( // if loading do circular progress
        <div className={classes.loading}>
          <CircularProgress size="3rem" />
        </div>
      ) : (
        <>
               
              {/* Select Hotels,Restaurants,Attractions */}
                 
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>

          {/* Choose Rating  */}
          <FormControl className={classes.formControl}>
            <InputLabel>Rating</InputLabel>
            <Select value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>  

              
              {/* // show all restaurants */}

          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, key) => (
              <Grid item key={key} ref={reference[key]}  xs={12}> 
              {/* take full space from extra small to big devices */}
                <PlaceDetails
                  place={place}
                  selected={Number(childClick) === key}  //to scroll down to the card that has been clicked
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
