import React from "react";
import useStyles from "./styles.js";
import GoogleMapReact from "google-map-react";
import { Paper, useMediaQuery, Typography } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";

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
        defaultCenter={coordinates} // center of the map
        center={coordinates}           //current center of the map
        defaultZoom={14}
        margin={[50, 50, 50, 50]}

       

        // when we change the map
        onChange={(e) => {            
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBoundary({ ne: e.marginBounds.ne, sw: e.marginBounds.sw }); //top-right and bottom-left
        }}

        // when we click on any restaurant
        //when we click on any card on map it set the childclick and from app it send to list where it move to that card
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
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            ) : (
              //elivation is for shadow effect
              <Paper elevation={3} className={classes.paper}> 
                <Typography
                  className={classes.typography}
                  variant="subtitle2"
                  gutterBottom //margin at the bottom
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
                  readOnly />
              </Paper>
            )}
          </div>
        ))}

        
{/* console.log(weatherData); */}
        {weatherData?.list?.map((data, key) => (
          <div
            key={key}
            lat={data?.coordinates?.lat}
            lng={data?.coordinates?.lon}
            
          >
            <img
              src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
              // console.log(``);
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
