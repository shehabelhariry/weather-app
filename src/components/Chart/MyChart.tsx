import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { selectDay } from "../../store/slices/weatherData/weatherDataSlice";
import { RootState } from "../../store";
import { formatTemperature } from "../../utils";

const MyChart = () => {
  const { selectedDayData } = useSelector(
    (state: RootState) => state.weatherData
  );
  const { unit } = useSelector((state: RootState) => state.temperatureUnit);

  const dispatch = useDispatch();

  const formattedData = (selectedDayData || []).map((item) => {
    return {
      name: moment(item.dt_txt).format("hh A"),
      temp: formatTemperature(item.main.temp, unit),
      day: moment(item.dt_txt).format("LL"),
    };
  });

  return (
    <div>
      {formattedData.length > 0 ? (
        <div>
          <div className="w-screen flex flex-col items-center">
            <h1 className="my-3 flex flex-col">
              <span>{formattedData[0].day}</span>
              <span
                className="text-blue-900 text-center underline "
                onClick={() => dispatch(selectDay(null))}
              >
                CLOSE
              </span>
            </h1>
            <div className="flex flex-col items-stretch w-80">
              <ResponsiveContainer width="100%" minHeight={300}>
                <BarChart
                  data={formattedData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="temp" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MyChart;
