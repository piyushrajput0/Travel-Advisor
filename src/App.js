import React ,{useState ,useEffect} from "react";
import { CssBaseline, Grid } from "@material-ui/core"; //CssBaseLine bcz it simply normalizes the styles, so it just fix some padding, margins, background chores immediately for us
import Header from "./components/Header/Header";
import List from "./components/List/List";
// import PlaceDetails from "./components/PlaceDetails/PlaceDetails";
import Map from "./components/Map/Map";
import { getPlacesData, getWeatherData } from "./api/index";

const App = () => {
  const [places, setPlaces] =useState([]);
  const [placeFilter, setPlaceFilter] =useState([]);

   const [coordinates, setCoordinates] =useState({});
  const [boundary, setBoundary] =useState({}); // top-right and bottom-left
  const [childClick, setChildClick] =useState(null);
  const [loading, setLoading] =useState(false);  //circular progress
  const [type, setType] =useState("restaurants");
  const [rating, setRating] =useState("");
  const [weatherData, setWeatherData] =useState([]);


  
  //useEffect for filtering based on rating
  useEffect(() => {
    const placeFilter = places?.filter((place) => place?.rating > rating);
    setPlaceFilter(placeFilter);
  }, [places,rating]);

  //useEffect for the particular user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  //useEffect for boundary setting, the type of restaurants
  useEffect(() => {
    if (boundary.sw && boundary.ne) {
      setLoading(true);
      // setLoading(true);

      getWeatherData(coordinates.lat, coordinates.lng).then((data) =>
        setWeatherData(data)
      );

      getPlacesData(type, boundary.sw, boundary.ne).then((data) => {
        setPlaces(
          data?.filter((place) => place?.name && place?.num_reviews > 0)
        );
        setLoading(false);
        setPlaceFilter([]);                 //reseting the filtered places
      });
    }
  }, [type,coordinates, boundary]);

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: "100%" ,position:"fixed"}}>
        <Grid item xs={12} md={4}>
          <List
            places={placeFilter?.length ? placeFilter : places}  //if any rating or type chooose
            childClick={childClick}
            loading={loading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>

        <Grid item xs={12} md={8} style={{ alignSelf: 'center' ,marginBottom:'70px'}}>
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
