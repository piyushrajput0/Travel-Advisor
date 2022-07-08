import React from "react";
import { CssBaseline, Grid } from "@material-ui/core"; //CssBaseLine bcz it simply normalizes the styles, so it just fix some padding, margins, background chores immediately for us
import Header from "./components/Header/Header";
import List from "./components/List/List";
import PlaceDetails from "./components/PlaceDetails/PlaceDetails";
import Map from "./components/Map/Map";
import { getPlacesData, getWeatherData } from "./api/index";

const App = () => {
  const [places, setPlaces] = React.useState([]);
  const [placeFilter, setPlaceFilter] = React.useState([]);
  const [coordinates, setCoordinates] = React.useState({});
  const [boundary, setBoundary] = React.useState({});
  const [childClick, setChildClick] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [type, setType] = React.useState("restaurants");
  const [rating, setRating] = React.useState("");
  const [weatherData, setWeatherData] = React.useState([]);

  const [autocomplete, setAutocomplete] = React.useState(null);
  const onLoad = (ac) => setAutocomplete(ac);
  const onPlaceChanged = () => {
    //google maps
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    setCoordinates({ lat, lng });
  };

  //useEffect for filtering based on rating
  React.useEffect(() => {
    const placeFilter = places?.filter((place) => place?.rating > rating);
    setPlaceFilter(placeFilter);
  }, [rating]);

  //useEffect for the particular user location
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  //useEffect for boundary setting, the type of restaurants
  React.useEffect(() => {
    if (boundary.sw && boundary.ne) {
      setLoading(true);
      setLoading(true);

      getWeatherData(coordinates.lat, coordinates.lng).then((data) =>
        setWeatherData(data)
      );

      getPlacesData(type, boundary?.sw, boundary?.ne).then((data) => {
        setPlaces(
          data?.filter((place) => place?.name && place?.num_reviews > 0)
        );
        setLoading(false);
        setPlaceFilter([]);
      });
    }
  }, [type, coordinates, boundary]);

  return (
    <>
      <CssBaseline />
      <Header onPlaceChanged={onPlaceChanged} onLoad={onLoad} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={placeFilter?.length ? placeFilter : places}
            childClick={childClick}
            loading={loading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            setBoundary={setBoundary}
            places={placeFilter?.length ? placeFilter : places}
            setChildClick={setChildClick}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
