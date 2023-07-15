import axios from "axios";

export const getPlacesData = async (type, sw, ne) => {
  try {
    const {
      data: { data },
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw?.lat,
          tr_latitude: ne?.lat,
          bl_longitude: sw?.lng,
          tr_longitude: ne?.lng,
        },
        headers: {
          "x-rapidapi-host": "travel-advisor.p.rapidapi.com",
          "x-rapidapi-key": process.env.REACT_APP_RAPID_API_API_KEY,
        },
      }
    );
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getWeatherData = async (lat, lng) => {
  try {
    const { data } = await axios.get(
      'https://weatherbit-v1-mashape.p.rapidapi.com/current' ,
      {
      params: {
        lon: lng,
        lat: lat
      },
      headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_WEATHER_API_KEY,
        'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
      }
      
  });
  console.log(data);
    return data;
  } catch (e) {
    console.log(e);
  }
};
