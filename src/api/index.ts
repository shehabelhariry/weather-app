const WEATHER_APP_API_KEY = "f4419d8c292d14b972ab65ba162602b5";

const http = async (url: string) => {
  try {
    const initial = await fetch(url);
    if (initial.status >= 400 && initial.status < 600) {
      throw new Error(initial.statusText);
    }
    return await initial.json();
  } catch (e) {
    throw new Error(e);
  }
};

const getWeatherData = async (city = "Munich") => {
  const response = await http(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city},de&APPID=${WEATHER_APP_API_KEY}&cnt=40`
  );
  return response;
};

export { getWeatherData };
