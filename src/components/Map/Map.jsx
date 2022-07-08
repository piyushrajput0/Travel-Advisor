import React from "react";
import useStyles from "./styles.js";
import GoogleMapReact from "google-map-react";
import { Paper, useMediaQuery, Typography } from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Rating from "@material-ui/lab/Rating";
import mapStyles from "./MapStyles";

const Map = ({
  coordinates,
  setCoordinates,
  setBoundary,
  places,
  setChildClick,
  weatherData,
}) => {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: mapStyles,
        }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBoundary({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => {
          setChildClick(child);
        }}
      >
        {places?.map((place, key) => (
          <div
            className={classes.markerContainer}
            key={key}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
          >
            {isMobile ? (
              <LocationOnIcon color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography
                  className={classes.typography}
                  variant="subtitle2"
                  gutterBottom
                >
                  {place?.name}
                </Typography>
                <img
                  className={classes.pointer}
                  src={
                    place?.photo
                      ? place?.photo?.images?.large?.url
                      : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                  }
                  alt={place?.name}
                />
                <Rating
                  name="read-only"
                  size="small"
                  value={Number(place?.rating)}
                  readOnly
                />
              </Paper>
            )}
          </div>
        ))}
        {weatherData?.list?.map((data, key) => (
          <div
            key={key}
            lat={data?.coordinates?.lat}
            lng={data?.coordinates?.lon}
          >
            <img
              src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
              height="70px"
              alt={"weather"}
            />
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
