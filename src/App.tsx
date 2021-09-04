import { Provider } from "react-redux";
import "./App.css";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";
import store from "./store";

function App() {
  return (
    <div className="App weather-app">
      <Provider store={store}>
        <WeatherInfo />
      </Provider>
    </div>
  );
}

export default App;
