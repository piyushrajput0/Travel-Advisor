import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";
import useStyles from "./styles";

const PlaceDetails = ({ place, refProp, selected }) => {
  const classes = useStyles();

  // console.log({ place });


// when a card is clicked
  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    // elevation for shadow effect
        <Card elevation={6}>   
      <CardMedia
        style={{ height: 350 }}
        image={
          place?.photo
            ? place?.photo?.images?.large?.url
            : "https://png.pngitem.com/pimgs/s/176-1760449_hotel-png-file-clipart-hotel-transparent-png.png"
        }
        title={place?.name}
      />
      <CardContent>
        {/* // extra margin from bottom */}
        <Typography gutterBottom variant="h5"> 
          {place?.name}
        </Typography>

        {/* Review */}
        <Box display="flex" justifyContent="space-between" my={2}>
          <Rating name="read-only" value={Number(place?.rating)} readOnly />
          <Typography component="legend">
            {place?.num_reviews} review{place?.num_reviews > 1 && "s"}
          </Typography>
        </Box>

        {/* Price */}
        {place.price && (<Box display={"flex"} justifyContent={"space-between"}>
          <Typography variant="subtitle1">Price</Typography>
          <Typography variant="subtitle1" gutterBottom>
            {place.price }
          </Typography>
        </Box>
        )}

        <Box display={"flex"} justifyContent={"space-between"}>
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography variant="subtitle1" gutterBottom>
            {place.ranking ? place.ranking : "Not Know" }
          </Typography>
        </Box>

        
        {place?.cuisine?.map(({ name, key }) => (
          <Chip
            key={key}
            label={name}
            size={"small"}
            className={classes.chip}
          />
        ))}
        {place?.address && (
          <Typography
            variant="subtitle2"
            color={"textSecondary"}
            gutterBottom
            className={classes.subtitle}
          >
            <LocationOnIcon />
            {place.address}
          </Typography>
        )}

        {place.phone && (
          <Typography
            variant="subtitle2"
            color={"textSecondary"}
            gutterBottom
            className={classes.spacing}
          >
            <PhoneIcon /> {place.phone}
          </Typography>
        )}

        {/* Trip Advisor Link */}
        <CardActions>
          <Button
            size={"small"}
            color={"primary"}
            onClick={() => {
              window.open(place?.web_url, "_blank");
            }}
          >
            Trip Advisor
          </Button>

          {/* Website Link */}
          <Button
            size={"small"}
            color={"primary"}
            onClick={() => {
              window.open(place?.website, "_blank");   // _blank means to open in new tab
            }}
          >
            Website
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default PlaceDetails;
